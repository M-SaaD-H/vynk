"use client"

import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion } from "motion/react"

type Testimonial = {
  name: string,
  content: string,
  avatar: string
}

const Testimonials = ({ testimonials }: { testimonials: Testimonial[] }) => {
  const [currentTestimonial, setCurrentTestimonial] = useState(testimonials[0]);
  const [pendingTestimonials, setPendingTestimonials] = useState(
    testimonials.filter((_, idx) => idx > 0)
  );

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     setPendingTestimonials(prev => [...prev, currentTestimonial]);
  //     setCurrentTestimonial(pendingTestimonials[0]);
  //     setPendingTestimonials(prev => prev.slice(1));
  //   }, 2000);

  //   return () => clearInterval(intervalId);
  // }, [currentTestimonial, pendingTestimonials]);

  return (
    <div className="relative bg-red-500">
      <div className="flex justify-end items-center gap-16 w-max min-w-[18rem] h-max">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={currentTestimonial.name}
            initial={{
              x: 100,
              filter: "grayscale(100%)",
            }}
            animate={{
              x: 0,
              filter: "grayscale(0%)",
            }}
            exit={{
              opacity: 0,
              x: -10,
              scale: 0.95
            }}
            transition={{
              duration: 0.8,
              ease: [0.25, 0.1, 0.25, 1]
            }}
          >
            <TestimonialBlock
              testimonial={currentTestimonial}
              className="shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
            />
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.span
            key={currentTestimonial.name}
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.95
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              y: -10,
              scale: 0.95
            }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.1, 0.25, 1]
            }}
            className={cn(
              "bg-card text-card-foreground border text-sm p-4 bottom-0 left-[1.2em] absolute w-[15rem] rounded-xl",
              "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]"
            )}
          >
            {currentTestimonial.content}
            {/* Peak at the bottom */}
            <div className="size-3 absolute -bottom-[0.4rem] left-[1rem] bg-card rotate-45 border-b border-r" />
          </motion.span>
        </AnimatePresence>

        <div className="flex items-center relative">
          <AnimatePresence mode="popLayout">
            {
              pendingTestimonials.map((t, index) => (
                <motion.div
                  key={t.name}
                  layout
                  initial={{
                    x: 20,
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1
                  }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: index * 0.05 // Slight stagger for smoother effect
                  }}
                  className="-mx-2"
                >
                  <TestimonialBlock
                    testimonial={t}
                    className="grayscale"
                  />
                </motion.div>
              ))
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

const TestimonialBlock = ({ testimonial, className }: { testimonial: Testimonial, className?: string }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      className="bg-blue-500"
    >
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        className={cn(
          "size-12 object-cover rounded-full shrink-0 shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]",
          className
        )}
      />
    </motion.div>
  )
}

Testimonials.displayName = "Testimonials"

export { Testimonials }