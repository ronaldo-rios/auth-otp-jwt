import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { HttpStatus } from '../helpers/http-status'

export const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const authHeader = request.headers['authorization']

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    response.status(HttpStatus.UNAUTHORIZED).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number
    }
    request.userId = decoded.id
    return next()
  } catch (err) {
    return response
      .status(HttpStatus.UNAUTHORIZED)
      .json({ error: 'Token inválido ou expirado' })
  }
}
