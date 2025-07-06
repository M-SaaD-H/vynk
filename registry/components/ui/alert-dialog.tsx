"use client"

import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"
import { AnimatePresence, motion } from "motion/react"

const AlertDialogStateContext = React.createContext<boolean | undefined>(undefined);

const AlertDialog = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <AlertDialogStateContext.Provider value={isOpen}>
      <AlertDialogPrimitive.Root
        open={isOpen}
        onOpenChange={setIsOpen}
        data-slot="alert-dialog"
        {...props}
      />
    </AlertDialogStateContext.Provider>
  )
}

const AlertDialogTrigger = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) => (
  <AlertDialogPrimitive.Trigger
    data-slot="alert-dialog-trigger"
    {...props}
  />
)

const AlertDialogPortal = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) => (
  <AlertDialogPrimitive.Portal
    data-slot="alert-dialog-portal"
    {...props}
  />
)

const AlertDialogOverlay = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) => {
  const isOpen = React.useContext(AlertDialogStateContext);

  return (
    <AnimatePresence>
      {
        isOpen && (
          <motion.div
            initial={{
              opacity: 0,
              backdropFilter: "blur(0px)"
            }}
            animate={{
              opacity: 1,
              backdropFilter: "blur(4px)"
            }}
            exit={{
              opacity: 0,
              backdropFilter: "blur(0px)"
            }}
            transition={{
              duration: 0.3
            }}
            className="fixed inset-0 z-50 bg-black/50"
          >
            <AlertDialogPrimitive.Overlay
              data-slot="alert-dialog-overlay"
              className={cn(
                "fixed inset-0 z-50 bg-transparent",
                className
              )}
              {...props}
            />
          </motion.div>
        )
      }
    </AnimatePresence>
  )
}

const AlertDialogContent = ({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) => {
  const isOpen = React.useContext(AlertDialogStateContext);
  const [isJuggling, setIsJuggling] = React.useState(false);

  const handleOverlayClick = () => {
    setIsJuggling(true);
    setTimeout(() => setIsJuggling(false), 600);
  };

  return (
    <AlertDialogPortal forceMount>
      <AlertDialogOverlay onClick={handleOverlayClick} />
      <AnimatePresence initial={false}>
        {
          isOpen && (
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.97,
                x: 30,
                y: -30,
                filter: "blur(10px)"
              }}
              animate={{
                opacity: 1,
                scale: 1,
                x: isJuggling ? [0, -6, 6, 0] : 0,
                y: 0,
                filter: "blur(0px)"
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                x: 30,
                y: -30,
                filter: "blur(10px)"
              }}
              transition={{
                duration: 0.25,
                x: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }}
              className="fixed z-50 top-1/2 left-1/2 -translate-1/2 inset-0 h-screen w-screen flex justify-center items-center"
            >
              <AlertDialogPrimitive.Content
                data-slot="alert-dialog-content"
                {...props}
                className={cn(
                  "bg-neutral-50 dark:bg-neutral-900 relative z-50 flex flex-col w-full md:max-w-[30rem] max-w-[calc(100vw-2em)] gap-2 rounded-lg border border-border p-6 shadow-lg",
                  className
                )}
              />
            </motion.div>
          )
        }
      </AnimatePresence>
    </AlertDialogPortal >
  )
}

const AlertDialogHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center md:text-left",
      className
    )}
    {...props}
  />
)
AlertDialogHeader.displayName = "AlertDialogHeader"

const AlertDialogFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "mt-4 flex flex-col-reverse md:flex-row md:justify-end gap-2",
      className
    )}
    {...props}
  />
)
AlertDialogFooter.displayName = "AlertDialogFooter"

const AlertDialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => (
  <AlertDialogPrimitive.Title
    data-slot="alert-dialog-title"
    className={cn("text-xl font-semibold", className)}
    {...props}
  />
)

const AlertDialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => (
  <AlertDialogPrimitive.Description
    data-slot="alert-dialog-description"
    className={cn("text-muted-foreground text-sm", className)}
    {...props}
  />
)

const AlertDialogAction = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) => (
  <AlertDialogPrimitive.Action
    className={cn(buttonVariants(), className)}
    {...props}
  />
)

const AlertDialogCancel = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) => (
  <AlertDialogPrimitive.Cancel
    className={cn(buttonVariants({ variant: "outline" }), className)}
    {...props}
  />
)

export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
