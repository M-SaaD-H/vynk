import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/options';
import { ApiResponse } from '@/lib/apiResponse';
import { connectToDB } from '@/lib/db';
import { ITemplate, Template } from '@/models/template.model';
import { dodoClient } from '@/lib/dodopayments'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if(!session) {
      return NextResponse.json(
        new ApiResponse(401, null, 'Unauthorized request'),
        { status: 401 }
      )
    }

    const { templateId, customerDets } = await req.json();

    await connectToDB();

    const template: ITemplate | null = await Template.findById(templateId);

    if(!template) {
      return NextResponse.json(
        new ApiResponse(404, null, 'Invalid Template ID'),
        { status: 404 }
      )
    }

    const payment = await dodoClient.payments.create({
      billing: {
        city: customerDets.city,
        country: customerDets.country,
        state: customerDets.state,
        street: customerDets.addressLine,
        zipcode: customerDets.zipCode
      },
      customer: {
        email: customerDets.email,
        name: customerDets.name
      },
      product_cart: [{ product_id: template.productId, quantity: 1 }],
      metadata: { userId: session.user._id },
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/orders`
    });

    return NextResponse.json(
      new ApiResponse(
        200,
        {
          dodoPaymentId: payment.payment_id,
          amount: payment.total_amount,
          template,
          paymentLink: payment.payment_link
        }
      ),
      { status: 200 }
    )
  } catch(error) {
    console.error('Error while creating payment link E:', error);
    return NextResponse.json(
      new ApiResponse(501, null, 'Error while creating payment link'),
      { status: 501 }
    )
  }
}