import jwt from 'jsonwebtoken'

export const generateJWT = (id: number) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '8h',
  })
}
