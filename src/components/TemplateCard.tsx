'use client'

import React, { useState } from 'react'
import { Button } from './ui/Btn'
import Image from 'next/image'
import Link from 'next/link'
import { IconTrash } from '@tabler/icons-react'
import { ITemplate } from '@/models/template.model'
import { CustomerDetailForm } from './CustomerDetailForm'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'motion/react'

export default function TemplateCard({ template }: { template: ITemplate }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className='mx-8 p-6 flex flex-col-reverse md:flex-col rounded-lg border border-border bg-card'>
      <div className='flex flex-col md:flex-row'>
        <div className='max-md:my-8 md:mb-4 relative'>
          <h1 className='font-sans text-2xl font-semibold tracking-tight'>{template.title}</h1>
          <p className='text-muted-foreground text-sm'>{template.description}</p>
          <Link href={template.liveLink} target='_blank' className='absolute inset-0' />
        </div>
        <Button
          onClick={(e) => {
            if (!session) {
              e.preventDefault();
              toast('Please login to purchase.');
              router.push('/login');
              return;
            }

            setIsOpen(true);
          }}
          className='h-max'
        >
          Buy Now $ {template.price}
        </Button>
        <CheckoutDialog template={template} isOpen={isOpen} seIsOpen={setIsOpen} />
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

const CheckoutDialog = ({
  template,
  isOpen,
  seIsOpen,
}: {
  template: ITemplate;
  isOpen: boolean;
  seIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.97,
            x: 30,
            y: -30,
            filter: 'blur(10px)'
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            filter: 'blur(0px)'
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            x: 30,
            y: -30,
            filter: 'blur(10px)'
          }}
          transition={{
            duration: 0.25,
          }}
          className="fixed z-50 top-1/2 left-1/2 -translate-1/2 inset-0 flex justify-center items-center w-screen h-screen"
        >
          <div className="fixed h-screen w-screen bg-black/60 -z-10" onClick={() => seIsOpen(false)} />
          <div className="h-max md:w-[30%] rounded-lg bg-card border border-border p-6">
          {/* <div className="h-max w-[100vw] rounded-lg bg-card border border-border p-6"> */}
            <div className="flex flex-row gap-4 w-full">
              <Image
                priority={false}
                src={template.images[0]}
                width={200}
                height={150}
                alt={template.title}
                className="rounded-xl max-md:max-w-[50%]"
              />
              <div className="w-full">
                <h3 className="text-xl font-semibold">{template.title}</h3>
                <h1 className="text-primary text-3xl font-bold">${template.price}</h1>
                <div className="m-2 cursor-pointer ml-auto w-max">
                  <IconTrash size={22} onClick={() => seIsOpen(false)} />
                </div>
              </div>
            </div>
            <div className="mt-8 w-full">
              <CustomerDetailForm template={template} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};