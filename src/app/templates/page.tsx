'use client'

import React, { useEffect, useState } from 'react'
import TemplateCard from '@/components/TemplateCard'
import { ITemplate } from '@/models/template.model';

export default function page() {
  const [templates, setTemplates] = useState<ITemplate[]>([]);

  useEffect(() => {
    fetch('/api/templates')
      .then(res => res.json())
      .then(data => setTemplates(data.data.templates));
  }, [])

  return (
    <div className='max-w-4xl mx-auto min-h-screen py-8'>
      <h1 className='my-4 bg-clip-text text-transparent text-center py-2 relative -z-1 font-bold font-sans tracking-tight text-4xl md:text-6xl bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white text-balance'>
        Premium Templates for Modern Apps
      </h1>
      <Templates templates={templates} />
    </div>
  )
}

const Templates = ({ templates }: { templates: ITemplate[] }) => (
  <div className='flex flex-col gap-6 my-12'>
    {
      templates.map(t => (
        <TemplateCard template={t} key={t.title} />
      ))
    }
  </div>
)