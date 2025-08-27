import { v4 as uuid } from 'uuid'
import { prisma } from '../config/prisma'

export const generateOTP = async (userId: number) => {
    const code = Array.from({ length: 6 }, () => 
        Math.floor(Math.random() * 10)
    ).join('')

    const expiresAt = new Date()
    expiresAt.setMinutes(expiresAt.getMinutes() + 30)

    const otp = await prisma.otp.create({
        data: {
            id: uuid(),
            code: code,
            expiresAt: expiresAt,
            used: false,
            userId: userId
        }
    })

    return otp
}

export const validateOTP = async (id: string, code: string) => {
    const otp = await prisma.otp.findFirst({
        select: {
            user: true
        },
        where: {
            id: id,
            code: code,
            expiresAt: {
                gt: new Date()
            },
            used: false
        }
    })

    if (otp && otp.user) {
        await prisma.otp.update({
            where: {
                id: id
            },
            data: { used: true }
        })
        return otp.user
    }

    return false
}