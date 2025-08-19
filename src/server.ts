import cors from 'cors'
import express, { urlencoded } from 'express'
import helmet from 'helmet'
import { router } from './routes/main'

const server = express()
server.use(helmet)
server.use(cors())
server.use(urlencoded({ extended: true }))
server.use(express.json())

server.use(router)

const port = process.env.PORT
server.listen(port, () => console.log(
    `Server running: http://localhost:${port}`)
)