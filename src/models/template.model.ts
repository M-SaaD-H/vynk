import mongoose, { Schema } from 'mongoose';

export interface ITemplate {
  _id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  images: string[];
  liveLink: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const templateSchema = new Schema<ITemplate>(
  {
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  liveLink: { type: String, required: true },
  price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Template = mongoose.models?.Product || mongoose.model<ITemplate>('Template', templateSchema);