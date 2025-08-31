import { z } from 'zod'

export const authSigninSchema = z.object({
  email: z
    .string({ message: 'Campo email é obrigatório' })
    .email('E-mail inválido'),
})

export const authSignupSchema = z.object({
  name: z
    .string({ message: 'Campo de nome é obrigatório' })
    .min(3, 'Nome deve ter pelo menos três caracteres'),
  email: z
    .string({ message: 'Campo email é obrigatório' })
    .email('E-mail inválido'),
})

export const useOtpSchema = z.object({
  id: z.string({ message: 'Id OTP é obrigatório' }),
  code: z.string().length(6, 'Código precisa possuir 6 dígitos!'),
})
