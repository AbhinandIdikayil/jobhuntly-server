import { Channel, ConsumeMessage } from 'amqplib'
import { RabbitMQClient } from './index'
import { createUser, updatePassword } from '../database/mongodb/repositories';

const EXCHANGE = 'direct_logs'
const QUEUE = 'USER'

export class MessageHandler {
    private channel: Channel;

    constructor() {
        this.channel = RabbitMQClient.getInstance().getChannel()
    }

    async setupConsumer(ROUTING_KEY: string[]): Promise<void> {
        try {
            await this.channel.assertExchange(EXCHANGE, 'direct', { durable: false });
            const queue = await this.channel.assertQueue(QUEUE, { durable: false, exclusive: false })
            if (ROUTING_KEY.length > 0) {
                for (const routing of ROUTING_KEY) {
                    await this.channel.bindQueue(queue.queue, EXCHANGE, routing)
                }

                await this.channel.consume(queue.queue, this.handleMessage.bind(this), { noAck: false })
            }
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    private async handleMessage(msg: ConsumeMessage | null): Promise<void> {
        try {
            console.log(msg?.fields.routingKey)
            if (msg && msg.fields.routingKey === 'user') {
                const parsed = JSON.parse(msg.content.toString())
                const routingKey = msg.fields.routingKey;
                console.log(`Recieved message with${routingKey} and content-${parsed}`)
                if (routingKey === 'user') {
                    let user = await createUser({
                        name: parsed?.name,
                        email: parsed?.email,
                        password: parsed?.password,
                        role: parsed?.role
                    })
                    console.log(user, '-----------user saved -------------')
                }
                this.channel.ack(msg)
            } else if (msg && msg?.fields?.routingKey === 'fg-ps-user') {
                const parsed = JSON.parse(msg.content.toString())
                if(msg?.fields?.routingKey == 'fg-ps-user') {
                    let updatedDoc = await updatePassword(parsed.password,parsed.email)
                    if(updatedDoc) {
                        console.log('----------- password updated succesffully USER-----------')
                    }
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}