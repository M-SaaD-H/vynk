import mongoose, { Schema } from 'mongoose'

export interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model<IUser>('User', userSchema);