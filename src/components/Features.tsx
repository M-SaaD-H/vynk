import React, { useRef } from "react"
import { BentoGrid, BentoGridItem } from "@/components/BentoGrid"
import { motion, useInView } from "motion/react"

const Features = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: 0.3
  })

  return (
    <div ref={containerRef} className="md:max-w-3xl mx-auto my-8 md:my-18">
      <motion.h1
        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0, transition: { duration: 0.3 } } : {}}
        className="bg-clip-text text-transparent py-2 max-md:mx-6 relative z-20 font-bold font-sans tracking-tight text-4xl md:text-7xl bg-gradient-to-b from-neutral-900 to-neutral-600 dark:from-neutral-700 dark:to-white"
      >
        Features
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, filter: "blur(10px)", y: 40 }}
        animate={isInView ? { opacity: 1, filter: "blur(0px)", y: 0, transition: { delay: 0.4, duration: 0.3 } }: {}}
      >
        <BentoGrid className="md:max-w-3xl max-w-[calc(100%-2rem)] mx-auto my-8 md:auto-rows-[12rem]">
          {features.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              description={item.description}
              className={item.className}
            />
          ))}
        </BentoGrid>
      </motion.div>
    </div>
  )
}

const features = [
  {
    title: "Production-Ready Components",
    description: "Instantly integrate polished UI components with zero configuration — just plug and play.",
    className: "md:col-span-2"
  },
  {
    title: "Intuitive Building Blocks",
    description: "Effortlessly assemble layouts with our drag-and-drop system — transform hours of work into minutes.",
    className: "md:col-span-1"
  },
  {
    title: "Intelligent Code Snippets",
    description: "Use proven code patterns to build faster — innovate, don\"t reinvent.",
    className: "md:col-span-1"
  },
  {
    title: "Enterprise-Grade Templates",
    description: "Launch faster with professionally designed templates — ready to customize and deploy.",
    className: "md:col-span-2"
  }
]

export default Features