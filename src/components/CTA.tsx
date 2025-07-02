import React from "react"
import { Button } from "./ui/Btn"
import { IconArrowRight } from "@tabler/icons-react"
import Link from "next/link"

const CTA = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 mx-auto mt-30 mb-12">
      <div className="md:space-y-2">
        <h1 className="font-sans tracking-tight text-3xl md:text-5xl font-bold mx-8 text-center">
          Accelerate Your Development Journey
        </h1>
        <h1 className="font-sans tracking-tight mx-8 text-center text-muted-foreground">
          Transform your workflow with a single command
        </h1>
      </div>
      <Button className="gap-0 hover:gap-4 transition-all duration-200 w-max" asChild>
        <Link href={"/docs"}>
          Launch Your Product <IconArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>
  )
}

export default CTA
