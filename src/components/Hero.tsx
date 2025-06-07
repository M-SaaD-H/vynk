import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from './ui/Btn'
import { Tags } from '@/components/Tags'
import Link from 'next/link'

const Hero = () => {
  return (
    <div className='p-8 relative w-full [mask-image:radial-gradient(ellipse_at_center,black,transparent)] mask-y-from-50% mask-y-to-70%'>
      <div
        className={cn(
          'absolute inset-0 -z-50',
          '[background-size:40px_40px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]',
        )}
      />
      <h1 className='mt-16 bg-clip-text text-transparent text-center py-2 relative z-20 font-bold font-sans tracking-tight text-4xl md:text-7xl bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white'>
        Skip the Boring Stuff.<br />Build What Matters.
      </h1>
      <p className='mx-auto max-w-xl text-center text-muted-foreground md:text-base text-sm text-shadow-md/8'>Save hours on setup and structure. Vink gives you everything you need to build fast, clean, and consistent user interfaces — without the boilerplate.</p>
      <div className='mx-auto w-max flex gap-2 mt-8'>
        <Button asChild><Link href={'/docs/components'}>Get Started</Link></Button>
        <Button variant={'outline'} asChild><Link href={'/docs/blocks'}>Browse Blocks</Link></Button>
      </div>
      <div className='mx-auto my-12 w-max'>
        <Tags />
      </div>
    </div>
  )
}

export default Hero
