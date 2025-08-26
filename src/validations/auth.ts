import { z } from 'zod'

export const authSiginSchema = z.object({
    email: z.string({ message: 'Campo email é obrigatório' })
            .email('E-mail inválido')
})

export const authSigupSchema = z.object({
    name: z.string({ message: 'Campo de nome é obrigatório'})
        .min(3, 'Nome deve ter pelo menos três caracteres'),
    email: z.string({ message: 'Campo email é obrigatório' })
            .email('E-mail inválido')
})