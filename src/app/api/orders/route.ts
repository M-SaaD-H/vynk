import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay'
import { authOptions } from '../auth/[...nextauth]/options';
import { ApiResponse } from '@/lib/apiResponse';
import { connectToDB } from '@/lib/db';
import { ITemplate, Template } from '@/models/template.model';
import { Order } from '@/models/order.model';

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
  key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET!,
});


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if(!session) {
      return NextResponse.json(
        new ApiResponse(401, null, 'Unauthorized request'),
        { status: 401 }
      )
    }

    const { templateId } = await req.json();

    await connectToDB();

    const template: ITemplate | null = await Template.findById(templateId);

    if(!template) {
      return NextResponse.json(
        new ApiResponse(404, null, 'Invalid Template ID'),
        { status: 404 }
      )
    }

    // create a razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(template.price * 100),
      currency: 'USD',
      receipt: `reciept-${Date.now()}`,
      notes: {
        templateId: template._id.toString()
      }
    });

    // create the corrosponding order in the DB as well
    const dbOrder = await Order.create({
      userId: session.user._id,
      templateId: template._id,
      razorpayOrderId: order.id,
      amount: Math.round(template.price * 100),
      status: 'pending'
    });

    return NextResponse.json(
      new ApiResponse(
        200,
        {
          orderId: order.id,
          amount: order.amount,
          currency: order.currency,
          dbOrderId: dbOrder._id,
          template
        }
      ),
      { status: 200 }
    )
  } catch(error) {
    console.error('Error while creating order E:', error);
    return NextResponse.json(
      new ApiResponse(501, null, 'Error while creating order'),
      { status: 501 }
    )
  }
}