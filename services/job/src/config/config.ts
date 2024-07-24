import {config} from 'dotenv'
config()


export const PORT = process.env.PORT as string
export const MONGO_URI = process.env.MONGO_URI as string
export const RABBITMQ_URL = process.env.RABBITMQ_URL as string


