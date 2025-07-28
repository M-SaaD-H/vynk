"use client";

import React, { useState } from "react"
import { Button } from "../../../ui/button";
import { Form, FormMessage, FormControl, FormLabel, FormItem, FormField } from "../../../ui/form";
import { Input } from "../../../ui/input";
import { signupSchema } from "../schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form"
import { z } from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../ui/card";
import { IconArrowRight, IconBrandGoogle, IconLoader2 } from "@tabler/icons-react";
import { FaGithub } from "react-icons/fa6";

export const SignUp = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signupSchema>) => {
    setIsSubmitting(true);

    try {
      // Hit the sign up endpoint of your api
      const res = await fetch("/your/sign-up/api/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password
        })
      });
      const result = await res.json();

      toast.success('Signup successful', {
        description: result.data?.message || 'Signup successful'
      });

      // re-direct the user after sign up
      router.replace('/sign-in');
    } catch (error) {
      toast.error('Signup failed', {
        description: error instanceof Error ? error.message : 'Failed to signup'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-input md:mx-auto mx-4 max-w-full md:max-w-md md:w-full rounded-lg shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] dark:shadow-none">
      <CardHeader>
        <CardTitle className="text-3xl text-center font-bold font-sans tracking-tight">
          Vynk
        </CardTitle>
        <CardDescription className="text-muted-foreground mx-auto text-center">
          <p className="text-base font-bold">Sign up on Vynk</p>
          <p className="text-sm">Create your accout to get started</p>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-2">Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-2">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-2">Password</FormLabel>
                  <FormControl>
                    <Input placeholder="••••••••" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full mt-6 group disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="ml-2">Signing in...</span>
                  <IconLoader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Sign In <span className="group-hover:translate-x-1 transition-transform duration-300"><IconArrowRight size={16} /></span>
                </>
              )}
            </Button>
          </form>
        </Form>

        <div className="flex gap-2 items-center justify-center my-6 text-muted-foreground">
          <div className="h-[1px] w-4/9 rounded-full bg-gradient-to-r from-transparent to-muted-foreground/60" />
          or
          <div className="h-[1px] w-4/9 rounded-full bg-gradient-to-r to-transparent from-muted-foreground/60" />
        </div>

        <div className="flex gap-2">
          <Button variant={"secondary"}
            className="group/btn shadow-input bg-muted text-muted-foreground relative flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 font-medium dark:shadow-[0px_0px_1px_1px_#262626]"
            onClick={() => {/* Handle Google Login */ }}
          >
            <IconBrandGoogle className="h-4 w-4" />
            <span className="text-sm font-semibold">
              Google
            </span>
          </Button>
          <Button variant={"secondary"}
            className="group/btn shadow-input bg-muted text-muted-foreground relative flex w-full items-center justify-center gap-2 rounded-md px-6 py-3 font-medium dark:shadow-[0px_0px_1px_1px_#262626]"
            onClick={() => {/* Handle Github Login */ }}
          >
            <FaGithub className="h-4 w-4" />
            <span className="text-sm font-semibold">
              Github
            </span>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center gap-2 text-muted-foreground">
        <p className="text-sm">
          Already have an account?
        </p>
        <Link href="/sign-up" className="text-sm underline underline-offset-4 hover:text-foreground transition-colors duration-200">Sign in</Link>
      </CardFooter>
    </Card>
  )
}