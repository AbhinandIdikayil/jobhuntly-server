import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'
import { PORT } from '../config/env'
import { setUpSocketIo } from '../infrastructure/socket'
import { routes } from '../infrastructure/routes'
import { dependencies } from '../config/dependencies'
import { Server as SocketIoServer } from 'socket.io'
const app: Application = express()

const server = http.createServer(app)


app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/chat', routes(dependencies))
const io = new SocketIoServer(server, {
    cors: {
        origin: "http://localhost:5173"
    }
})
setUpSocketIo(io)
server.listen(PORT, () => {
    console.log(`
        |------------------------------|
        |- CHAT SRV RUNNING ON ${PORT}   -|
        |------------------------------|
        `)
})

export { server }