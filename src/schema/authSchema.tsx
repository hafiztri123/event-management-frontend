import {  z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email({ message: 'Invalid email format' }),
  password: z
    .string()
    .min(1, { message: 'Password is required' })
    .min(8, { message: 'Password must be at least 8 characters' }),
  rememberMe: z.boolean().optional(),
});


export const registerSchema = z.object({
    fullname: z
    .string()
    .min(1, {message: 'Fullname is required'}),
    email: z
    .string()
    .min(1, {message: 'Email is required'})
    .email({message: 'Invalid email format'}),
    password: z
    .string()
    .min(8, {message: 'Password need to have at least 8 characters'})
})

export type LoginFormData = z.infer<typeof loginSchema>
export type RegisterFormData = z.infer<typeof registerSchema>