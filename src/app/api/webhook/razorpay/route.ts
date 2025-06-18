import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'
import { ApiResponse } from "@/lib/apiResponse";
import { connectToDB } from "@/lib/db";
import nodemailer from 'nodemailer';
import { IOrder } from "@/models/order.model";
import { IUser } from "@/models/user.model";
import { ITemplate } from "@/models/template.model";
import { Order } from "@/models/order.model";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-razorpay-signature');

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(body)
      .digest('hex');

    if(expectedSignature !== signature) {
      return NextResponse.json(
        new ApiResponse(400, null, 'Invaid Signature'),
        { status: 400 }
      )
    }

    const event = JSON.parse(body);

    await connectToDB();

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment.entity;

      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        {
          razorpayPaymentId: payment.id,
          status: 'completed',
        }
      ).populate([
        { path: 'userId', select: 'name email' },
        { path: 'templateId', select: 'title' },
      ]) as PopulatedOrder | null;

      if (order) {
        // Send email only after payment is confirmed
        const transporter = nodemailer.createTransport({
          host: 'live.smtp.mailtrap.io',
          port: 587,
          auth: {
            user: 'api',
            pass: process.env.MAILTRAP_PASS,
          },
        });

        const emailTemplate = getEmailTemplate(order);

        await transporter.sendMail(emailTemplate);
      }
    } else if (event.event === 'payment.failed') {
      const payment = event.payload.payment.entity;

      const order = await Order.findOneAndUpdate(
        { razorpayOrderId: payment.order_id },
        {
          status: 'failed'
        }
      )
    }

    return NextResponse.json(
      new ApiResponse(200, {}, 'Payment recieved'),
      { status: 200 }
    )
  } catch (error) {
    console.error('Webhook Error E:', error);
    return NextResponse.json(
      new ApiResponse(500, null, 'Webhook Error'),
      { status: 500 }
    )
  }
}

interface PopulatedOrder extends Omit<IOrder, 'userId' | 'templateId'> {
  userId: Pick<IUser, 'name' | 'email'>;
  templateId: Pick<ITemplate, 'title'>;
}

const getEmailTemplate = (order: PopulatedOrder) => {
  return {
    from: '"Vynk" <vynk.live>',
    to: order.userId.email,
    subject: 'Payment Confirmation - Vynk',
    text: `
Dear ${order.userId.name},

Thank you for choosing Vynk! Your purchase has been successfully processed.

📦 Order Details:
• Order ID: ${order._id?.toString().slice(-6)}
• Template: ${order.templateId.title}
• Amount Paid: $${order.amount.toFixed(2)}

Your template is now ready for download in your orders page. We hope you enjoy using it!

If you have any questions or need assistance, please don't hesitate to reach out to our support team.

Best regards,
The Vynk Team
    `.trim(),
  }
}