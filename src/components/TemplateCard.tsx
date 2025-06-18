'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Button } from './ui/Btn'
import Image from 'next/image'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogDescription } from '../../registry/components/ui/alert-dialog'
import { IconTrash } from '@tabler/icons-react'
import { ITemplate } from '@/models/template.model'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

const TemplateCard = ({ template }: { template: ITemplate }) => {
  const alertDialogCloseRef = useRef<HTMLButtonElement | null>(null);
  const { data: session } = useSession();
  const router = useRouter();

  type OrderData = {
    orderId: string,
    amount: number,
    currency: string,
    dbOrderId: string,
    template: ITemplate
  }

  const handlePurchase = async (template: ITemplate) => {
    if(!session) {
      toast('Please login to purchase.');
      router.push('/login');
      return;
    }

    if(!template._id) {
      toast.error('Invalid Template')
    }

    // Now proceed with the payments part
    
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: template._id })
      })
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to create order');
      }

      const orderData: OrderData = data.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Vynk',
        description: `${template.title}`,
        order_id: orderData.orderId,
        handler: function () {
          toast.success('Payment successful!');
          router.push('/orders');
        },
        prefill: {
          email: session.user.email,
          name: session.user.name
        }
      }

      // @ts-expect-error Razorpay is loaded via external script and not typed
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || 'Payment failed')
    }
  }

  return (
    <div className='mx-8 p-6 flex flex-col-reverse md:flex-col rounded-lg border border-border bg-card'>
      <div className='flex flex-col md:flex-row'>
        <div className='max-md:my-8 md:mb-4 relative'>
          <h1 className='font-sans text-2xl font-semibold tracking-tight'>{template.title}</h1>
          <p className='text-muted-foreground text-sm'>{template.description}</p>
          <Link href={template.liveLink} target='_blank' className='absolute inset-0' />
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className='h-max'>Buy Now ${template.price}</Button>
          </AlertDialogTrigger>
          <AlertDialogContent className='md:max-w-md'>
            <AlertDialogHeader className='flex flex-row gap-4'>
              <Image
                priority={false}
                src={template.images[0]}
                width={200}
                height={150}
                alt={template.title}
                className='rounded-xl max-md:max-w-[50%]'
              />
              <div className='w-full'>
                <AlertDialogTitle>{template.title}</AlertDialogTitle>
                <h1 className='text-primary text-3xl'>${template.price}</h1>
                {/* Using custom remove button instead of the AlertDialogCancel and using its ref to close the alert */}
                <AlertDialogCancel ref={alertDialogCloseRef} className='hidden'></AlertDialogCancel>
                <div className='m-2 cursor-pointer ml-auto w-max'><IconTrash size={22} onClick={() => alertDialogCloseRef.current?.click()} /></div>
              </div>
            </AlertDialogHeader>
            <AlertDialogDescription />
            <AlertDialogFooter>
              <AlertDialogAction className='w-[70%] mx-auto' onClick={() => handlePurchase(template)}>Checkout</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      <div className='flex justify-between md:mt-4'>
        {
          template.images.map((image, idx) => (
            <Image
              priority={false}
              src={image}
              key={idx}
              width={250}
              height={100}
              alt='Template Image'
              className={`rounded-xl ${idx > 0 && 'hidden md:block'} max-md:w-full`}
            />
          ))
        }
      </div>
    </div>
  )
}

export default TemplateCard
