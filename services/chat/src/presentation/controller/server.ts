import express, { Application } from 'express'
import cookieParser from 'cookie-parser'
import http from 'http'
import { PORT } from '../../config/env'
import { setUpSocketIo } from '../../infrastructure/socket'

const app:Application = express()
const server = http.createServer(app)

const io = setUpSocketIo(server)

app.use(express.json())
app.use(cookieParser())

app.listen(PORT,() => {
    console.log(`
|------------------------------|
|- CHAT SRV RUNNING ON ${PORT}   -|
|------------------------------|
    `)
})

export {app}