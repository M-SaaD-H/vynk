import { ITemplate } from "@/models/template.model";
import { customerDetailFormSchema } from "@/schema/customerDetailForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "../../registry/components/ui/input";
import { CountrySelect } from "./ui/CountrySelector/countrySelector";
import { Button } from "./ui/Btn";
import { z } from "zod";

export const CustomerDetailForm = ({ template }: { template: ITemplate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handlePurchase = async (template: ITemplate, formData: typeof customerDetailFormSchema._type) => {
    if (!session) {
      toast('Please login to purchase.');
      router.push('/login');
      return;
    }

    if (!template._id || !template.productId) {
      toast.error('Invalid Template')
      return;
    }

    // Now proceed with the payments part

    try {
      setIsLoading(true);

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ templateId: template._id, customerDets: formData })
      })

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to create payment link');
      }

      const { paymentLink } = data.data;

      router.replace(paymentLink);
    } catch (error) {
      console.error(error);
      toast.error((error as Error).message || 'Payment failed')
    } finally {
      setIsLoading(false);
    }
  }
  const form = useForm<z.infer<typeof customerDetailFormSchema>>({
    resolver: zodResolver(customerDetailFormSchema),
    defaultValues: {
      name: '',
      email: '',
      country: '',
      addressLine: '',
      city: '',
      zipCode: '',
      state: ''
    },
  })

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit((data: z.infer<typeof customerDetailFormSchema>) => handlePurchase(template, data))} className="space-y-4 text-white">
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="eg: John" />
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
                <FormLabel>
                  Email <span className="text-red-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="eg: johndoe@example.com"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing Address</h3>

            <div>
              <CountrySelect
                control={form.control}
                name="country"
                label="Country"
                placeholder="Please select a country"
                required
                className="mb-4"
              />
            </div>

            <FormField
              name="addressLine"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Street Address <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="eg: 364 Kent St" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                name="city"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      City <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="eg: Sydney" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="state"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      State <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="eg: NSW" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="zipCode"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Zipcode <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="eg: 2035" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type='submit' className='w-[70%] mx-auto mt-8'>
            {isLoading ? "Processing..." : "Continue to Payment"}
          </Button>
        </form>
      </Form>
    </div>
  )
}