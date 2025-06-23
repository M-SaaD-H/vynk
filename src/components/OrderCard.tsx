import { IOrder } from "@/models/order.model"
import mongoose from "mongoose";
import Image from "next/image"

// This is for the unknown type issue only
type Order = Omit<IOrder, 'templateId'> & {
  templateId: {
    _id: mongoose.Types.ObjectId;
    title: string;
    liveLink: string;
    images: string[];
    price: number
  };
};

const OrderCard = ({ order }: { order: Order }) => {
  return (
    <div className='w-full p-4 bg-card border border-border rounded-lg flex gap-4'>
      <Image
        src={order.templateId.images[0]}
        width={200}
        height={150}
        alt='Template Image'
        className='rounded-lg'
      />
    </div>
  )
}

export default OrderCard
