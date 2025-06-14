import React from 'react'
import { Button } from './ui/Btn'
import Image from 'next/image'
import Link from 'next/link'

export type Template = {
  title: string,
  description: string,
  images: string[],
  liveLink: string
}

const TemplateCard = ({ template }: { template: Template }) => {
  return (
    <div className='mx-8 p-6 flex flex-col-reverse md:flex-col rounded-lg border border-border bg-card relative'>
      <div className='flex flex-col md:flex-row'>
        <div className='max-md:my-8 md:mb-4'>
          <h1 className='font-sans text-2xl font-semibold tracking-tight'>{template.title}</h1>
          <p className='text-muted-foreground text-sm'>{template.description}</p>
        </div>
        <Button className='h-max relative z-50'>Buy Now $10</Button>
      </div>
      <div className='flex justify-between md:mt-4'>
        {
          template.images.map((image, idx) => (
            <Image
              src={image}
              key={image}
              width={250}
              height={146}
              alt='Template Image'
              className={`rounded-xl ${idx > 0 && 'hidden md:block'} max-md:w-full`}
            />
          ))
        }
      </div>
      <Link href={template.liveLink} target='_blank' className='absolute inset-0' />
    </div>
  )
}

export default TemplateCard
