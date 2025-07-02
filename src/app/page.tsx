"use client"

import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import Features from "@/components/Features";
import Init from "@/components/Init";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <Init />
      <Features />
      <CTA />
      <Footer />
    </div>
  );
}
