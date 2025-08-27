import { RequestHandler } from 'express'
import { sendEmail } from '../config/email'
import { generateJWT } from '../config/jwt'
import { HttpStatus } from '../enums/http-status'
import { generateOTP, validateOTP } from '../services/otp'
import { createUser, getUserByEmail } from '../services/user'
import {
    authSigninSchema,
    authSignupSchema,
    useOtpSchema
} from '../validations/auth'

export const signin: RequestHandler = async (request, response) => {

    const data = authSigninSchema.safeParse(request.body)
    if (!data.success) {
        response
            .status(HttpStatus.BAD_REQUEST)
            .json({ error: data.error.flatten((issue) => issue.message).fieldErrors })
        return
    }

    const user = await getUserByEmail(data.data.email)
    if (!user) {
        response.status(HttpStatus.CONFLICT).json({ error: 'Usuário não encontrado' })
        return
    }

    const otp = await generateOTP(user.id)
    await sendEmail(
        user.email,
        `Seu código de acesso é ${otp.code}`,
        `Digite seu código: ${otp.code}`
    )
    response.status(HttpStatus.CREATED).json({ id: otp.id })
}

export const signup: RequestHandler = async (request, response) => {
    const data = authSignupSchema.safeParse(request.body)
    if (!data.success) {
        response
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: data.error.flatten((issue) => issue.message).fieldErrors })
        return
    }

    const userExists = await getUserByEmail(data.data.email)
    if (userExists) {
        return response
            .status(HttpStatus.CONFLICT)
            .json({ error: 'Já existe usuário cadastrado com esse e-mail!' })
    }

    const createdUser = await createUser(data.data.name, data.data.email)

    return response.status(HttpStatus.CREATED).json({ user: createdUser })
}

export const useOtp: RequestHandler = async (request, response) => {
    const data = useOtpSchema.safeParse(request.body)
    if (!data.success) {
        response.status(HttpStatus.BAD_REQUEST).json({ error: data.error.flatten((issue) => issue.message).fieldErrors })
        return
    }

    const user = await validateOTP(data.data.id, data.data.code)
    if (!user) {
        response.status(HttpStatus.CONFLICT).json({ error: 'Código inválido ou expirado!' })
        return
    }

    const token = generateJWT(user.id)
    response.json({ token, user })
}