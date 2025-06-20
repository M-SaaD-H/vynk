'use client'

import { z } from 'zod'

export const customerDetailFormSchema = z.object({
  name: z.string().min(1, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  country: z.string().min(2, 'Country must be at least 2 characters'),
  addressLine: z.string().min(1, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City must be at least 2 characters'),
  zipCode: z.string().min(1, 'Zip code must be at least 5 characters'),
  state: z.string().min(1, 'State must be at least 2 characters'),
});