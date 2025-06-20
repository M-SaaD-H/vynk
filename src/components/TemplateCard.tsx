'use client'

import React, { useRef } from 'react'
import { Button } from './ui/Btn'
import Image from 'next/image'
import Link from 'next/link'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogDescription } from '../../registry/components/ui/alert-dialog'
import { IconTrash } from '@tabler/icons-react'
import { ITemplate } from '@/models/template.model'
import { CustomerDetailForm } from './CustomerDetsForm'

export default function TemplateCard({ template }: { template: ITemplate }) {
  const alertDialogCloseRef = useRef<HTMLButtonElement | null>(null);

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
            <CustomerDetailForm template={template} />
            <AlertDialogDescription />
            <AlertDialogFooter>
              <AlertDialogAction className='hidden'>Checkout</AlertDialogAction>
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
