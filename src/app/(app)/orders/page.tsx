'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export type PopulatedOrder = {
  _id?: string;
  status: string;
  templateId: {
    _id: string;
    title: string;
    liveLink: string;
    images: string[];
    price: number;
  };
};

function Page() {
  const [orders, setOrders] = useState<PopulatedOrder[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/orders/user');
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
        setOrders(data.data.orders);
      } catch (error) {
        toast.error((error as Error).message || 'Failed to fetch orders');
      }
    })();
  }, []);

  return (
    <div className="p-8">
      <h1 className="my-8 py-2 font-bold font-sans tracking-tight text-4xl md:text-6xl">Your Orders</h1>
      <Orders orders={orders} />
    </div>
  );
}

const Orders = ({ orders }: { orders: PopulatedOrder[] }) => (
  <div className="overflow-x-auto rounded-lg border border-border bg-card">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-muted">
          <th className="px-14 py-2 text-left font-semibold">Image</th>
          <th className="px-4 py-2 text-left font-semibold">Title</th>
          <th className="px-4 py-2 text-left font-semibold">Price</th>
          <th className="px-4 py-2 text-left font-semibold">Status</th>
          <th className="px-4 py-2 text-left font-semibold">Live Link</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order._id} className="border-t border-border hover:bg-secondary transition duration-200">
            <td className="px-4 py-2">
              <Image
                src={order.templateId.images[0]}
                alt={order.templateId.title}
                width={150}
                height={100}
                className="object-cover rounded"
              />
            </td>
            <td className="px-4 py-2">{order.templateId.title}</td>
            <td className="px-4 py-2">${order.templateId.price}</td>
            <td className="px-4 py-2 capitalize">{order.status}</td>
            <td className="px-4 py-2">
              <Link
                href={order.templateId.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
              >
                View
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default Page;
