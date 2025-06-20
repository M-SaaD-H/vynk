import { Webhook } from 'standardwebhooks';
import { headers } from 'next/headers';
import { Payment as BasePayment } from "dodopayments/resources/payments.mjs";
import { ApiResponse } from '@/lib/apiResponse';
import { Order } from '@/models/order.model';

type Payment = BasePayment & { payload_type: string };

type WebhookPayload = {
  type: string;
  data: Payment // Supporting only Payments for now. Subscriptions can also be added from adding type 'Subscription' here
};

const webhook = new Webhook(process.env.DODO_WEBHOOK_KEY!);

export async function POST(request: Request) {
  const headersList = await headers();

  try {
    const rawBody = await request.text();

    const webhookHeaders = {
      'webhook-id': headersList.get('webhook-id') || '',
      'webhook-signature': headersList.get('webhook-signature') || '',
      'webhook-timestamp': headersList.get('webhook-timestamp') || '',
    };

    await webhook.verify(rawBody, webhookHeaders);
    const payload = JSON.parse(rawBody) as WebhookPayload;

    if (!payload.data?.customer?.email) {
      throw new Error("Missing customer email in payload");
    }

    if(payload.data.payload_type === 'Payment' && !payload.data.subscription_id) { // This will always be Payment in our case.
      let productIds: string[] = [];

      if('product_cart' in payload.data && payload.data.product_cart) {
        productIds = payload.data.product_cart.map((product) => product.product_id);
      } else {
        throw new Error('Invalid payload data for one-time payment');
      }
      
      const status = 
        payload.type === 'payment.succeeded' ? 'completed' :
        payload.type === 'payment.failed' ? 'failed' : 'Unknown payment status'
      const userId = payload.data.metadata.userId;

      for(const productId in productIds) {
        
        await Order.create({
          userId,
          productId,
          paymentMethod: payload.data.payment_method,
          amount: payload.data.total_amount,
          status
        });
      }
    }

    return Response.json(
      new ApiResponse(200, null, 'Webhook processed successfully'),
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      new ApiResponse(
        400,
        { error: error instanceof Error ? error.message : 'Unknown error' },
        'Webhook processing failed'
      ),
      { status: 400 }
    );
  }
} 