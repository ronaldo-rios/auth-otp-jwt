import { RequestHandler } from 'express'
import { sendEmail } from '../config/email'
import { generateOtp } from '../services/otp'
import { createUser, getUserByEmail } from '../services/user'
import { authSiginSchema, authSigupSchema } from '../validations/auth'

export const sigin: RequestHandler = async (request, response) => {

    const data = authSiginSchema.safeParse(request.body)
    if (!data.success) {
        response.json({ error: data.error.flatten((issue) => issue.message).fieldErrors })
        return
    }

    const user = await getUserByEmail(data.data.email)
    if (!user) {
        response.json({ error: 'Usuário não encontrado' })
        return
    }

    const otp = await generateOtp(user.id)
    await sendEmail(
        user.email,
        `Seu código de acesso é ${otp.code}`,
        `Digite seu código: ${otp.code}`
    )
    response.json({ id: otp.id })
}

export const sigup: RequestHandler = async (request, response) => {
    const data = authSigupSchema.safeParse(request.body)
    if (!data.success) {
        response.json({ error: data.error.flatten((issue) => issue.message).fieldErrors })
        return
    }

    const userExists = await getUserByEmail(data.data.email)
    if (userExists) {
        response.json({ error: 'Já existe usuário cadastrado com esse e-mail!' })
        return
    }

    const createdUser = await createUser(data.data.name, data.data.email)

    return response.status(201).json({ user: createdUser })
}