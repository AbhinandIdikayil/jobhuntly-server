import { config } from 'dotenv'
config()

export const PORT = String(process.env.PORT) 
export const MONGO_URI = String(process.env.MONGO_URI)
export const RABBITMQ_URL = String(process.env.RABBITMQ_URL)
export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET)
export const CLIENT_URL = String(process.env.CLIENT_URL)

export const corsOption = {
    origin:CLIENT_URL, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}