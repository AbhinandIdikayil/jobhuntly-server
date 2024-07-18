import express, { Application } from 'express'
import { config } from 'dotenv'
config()
import cors from 'cors'
import cookieParser from 'cookie-parser'
import proxy from 'express-http-proxy'


const app: Application = express();
const PORT = String(process.env.PORT);
const origin = String(process.env.ORIGIN)
const AUTH = String(process.env.AUTH)
const CHAT = String(process.env.CHAT)
const COMPANY = String(process.env.COMPANY)
const JOB = String(process.env.JOB)
const USER = String(process.env.USER)

const corsOptions = {
    origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth',proxy(AUTH))
app.use('/api/v1/chat',proxy(CHAT))
app.use('/api/v1/company',proxy(COMPANY))
app.use('/api/v1/job',proxy(JOB))
app.use('/api/v1/user',proxy(USER))

app.listen(PORT, () => {
    console.log(`
==================================
==================================
= API GATEWAY IS RUNNING ON ${PORT} =
==================================
==================================`)
});