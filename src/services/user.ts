import { prisma } from '../config/prisma'

export const getUserByEmail = async (email: string) => {
    const user = await prisma.user.findFirst({
        where: { email: email }
    })
    return user
}

export const createUser = async (name: string, email: string) => {
    const newUser = await prisma.user.create({
        data: {
            name: name,
            email: email
        }
    })

    return newUser
}