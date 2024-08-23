import { config } from 'dotenv'
config()
import mongoose from 'mongoose'

export const PORT = process.env.PORT as string
export const MONGO_URI = process.env.MONGO_URI as string
export const RABBITMQ_URL = process.env.RABBITMQ_URL as string


export const corsOption = {
    origin: process.env.CLIENT_URL, // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'], // Allowed headers
    credentials: true // Allow cookies to be sent with requests
}

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI)
        console.log(`
        ------------------------
        - JOB SRB DB CONNECTED -
        ------------------------       
        `)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}