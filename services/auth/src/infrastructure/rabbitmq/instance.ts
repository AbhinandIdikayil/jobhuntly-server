import { RabbitMQ } from "."
import { MessageHandler } from "./messageHandler"


const URL = process.env.RABBITMQ_URL || 'amqp://localhost'
const EXCHANGE = process.env.EXCHANGE || 'direct_logs'


export const rabbitMQ = new RabbitMQ(URL,EXCHANGE)

export const messageHandler = new MessageHandler(rabbitMQ)  
