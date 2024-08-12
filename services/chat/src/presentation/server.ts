import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'
import { PORT } from '../config/env'
import { setUpSocketIo } from '../infrastructure/socket'
import { routes } from '../infrastructure/routes'
import { dependencies } from '../config/dependencies'

const app:Application = express()
const server = http.createServer(app)

const io = setUpSocketIo(server)

app.use(express.json())
app.use(cookieParser())
app.use('/api/v1/chat',routes(dependencies))

app.listen(PORT,() => {
    console.log(`
|------------------------------|
|- CHAT SRV RUNNING ON ${PORT}   -|
|------------------------------|
    `)
})

export {app}