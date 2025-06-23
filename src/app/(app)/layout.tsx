import React from 'react'
import Footer from '@/components/Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className='max-w-4xl mx-auto w-full min-h-screen'>
        {children}
      </div>
      <Footer />
    </div>
  );
}