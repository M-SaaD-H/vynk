import mongoose, { Schema } from 'mongoose'

interface PopulatedUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}

interface PopulatedTemplate {
  _id: mongoose.Types.ObjectId;
  title: string;
  liveLink: string;
  images: string[];
  price: number
}

export interface IOrder {
  _id?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | PopulatedUser;
  productId: string;
  templateId: mongoose.Types.ObjectId | PopulatedTemplate;
  paymentMethod?: string;
  amount: number;
  paymentStatus: string;
  status: "pending" | "completed" | "failed" | "none";
  createdAt?: Date;
  updatedAt?: Date;
}

const orderSchema = new Schema<IOrder>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    productId: { type: String, required: true },
    templateId: { type: Schema.Types.ObjectId, ref: 'Template', required: true },
    paymentStatus: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'completed', 'failed', 'none'],
      default: 'pending'
    }
  },
  { timestamps: true }
)

export const Order = mongoose.models?.Order || mongoose.model<IOrder>('Order', orderSchema);