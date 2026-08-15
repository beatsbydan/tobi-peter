import { z } from 'zod'

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const email = z.string().regex(emailRegex, 'Enter a valid email.')
const password = z.string().min(8, 'Must be at least 8 characters.')

export const loginSchema = z.object({ email, password })

export const registerSchema = z.object({ email, password })

export const resetSchema = z.object({ email })

export const changePasswordSchema = z
  .object({
    newPassword: password,
    confirmPassword: password,
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  })
