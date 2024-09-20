import mongoose from 'mongoose'
import { config } from 'dotenv'

config();

export const PORT = Number(process.env.PORT)
export const MQ_URL = String(process.env.RABBITMQ_URL)
export const ROUTING_KEY = ['user','fg-ps-user']
export const CLIENT_URL = String(process.env.CLIENT_URL)


export const connectDB = async () => {
    try {
        let URL = process.env.MONGO_URI as string  
        if (URL) {
            let res = await mongoose.connect(URL)
            if (res) {  
                console.log(`
-----------------------------
- USER SERVICE DB CONNECTED -       
-----------------------------
                `)
            }
        } else {
            console.log('not connected')
        }
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}