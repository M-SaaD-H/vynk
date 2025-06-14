import TemplateCard, { type Template } from '@/components/TemplateCard'
import React from 'react'

function page() {
  return (
    <div className='max-w-4xl mx-auto min-h-screen py-8'>
      <h1 className='my-4 bg-clip-text text-transparent text-center py-2 relative z-20 font-bold font-sans tracking-tight text-4xl md:text-6xl bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white text-balance'>
        Premium Templates for Modern Apps
      </h1>
      <div className='flex flex-col gap-6 my-12'>
        {
          templates.map(t => (
            <TemplateCard template={t} key={t.title} />
          ))
        }
      </div>
    </div>
  )
}

const templates: Template[] = [
  {
    title: 'SaaS Template',
    description: 'A modern, feature-rich template for building SaaS applications with authentication, subscription management, and dashboard analytics.',
    images: [
      '/templates/saas/1.png',
      '/templates/saas/2.png',
      '/templates/saas/3.png'
    ],
    liveLink: 'https://fintrack-flax-beta.vercel.app'
  }
]

export default page
