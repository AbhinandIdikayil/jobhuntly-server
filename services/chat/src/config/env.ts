import { config } from 'dotenv'
config()

export const PORT = String(process.env.PORT) 
export const MONGO_URI = String(process.env.MONGO_URI)
export const RABBITMQ_URL = String(process.env.RABBITMQ_URL)
export const ACCESS_TOKEN_SECRET = String(process.env.ACCESS_TOKEN_SECRET)
export const CLIENT_URL = String(process.env.CLIENT_URL)