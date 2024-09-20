import { config } from 'dotenv'
import mongoose from 'mongoose';
config();


export const CLIENT_URL = String(process.env.CLIENT_URL)
export const PORT = Number(process.env.PORT)
export const MONGO_URI = String(process.env.MONGO_URL)
export const RABBIT_MQ_URL = String(process.env.RABBITMQ_URL)


export const CONNECT_DB = async () => {
    try {
        if (MONGO_URI) {
            let res = await mongoose.connect(MONGO_URI)
            if (res) {
                console.log(`
--------------------------------
--- COMPANY SRV DB CONNECTED ---
--------------------------------
            `)
            }
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}