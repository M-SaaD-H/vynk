'use client';

import { Button } from '@/components/ui/Btn';
import { IconBrandGoogle } from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

export default function Login() {
  return (
    <div className='max-w-md md:w-[40%] bg-card border border-border rounded-lg p-8 md:mt-[10%] mt-[50%] mx-auto'>
      <h1 className='text-3xl font-bold mb-6 font-sans tracking-tight text-center'>Welcome to Vynk</h1>
      <Button variant={'secondary'}
        className='w-full'
        onClick={() => signIn('google')}
      >
        <IconBrandGoogle className="h-4 w-4" />
        <span className="text-sm">
          Sign in with Google
        </span>
      </Button>
    </div>
  );
}