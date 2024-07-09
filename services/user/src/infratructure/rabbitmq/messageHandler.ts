import { Channel, ConsumeMessage } from 'amqplib'
import { RabbitMQClient } from './index'
import { createUser } from '../database/mongodb/repositories';

const EXCHANGE = 'direct_logs'

export class MessageHandler {
    private channel: Channel;

    constructor() {
        this.channel = RabbitMQClient.getInstance().getChannel()
    }

    async setupConsumer(ROUTING_KEY: string[]): Promise<void> {
        try {
            await this.channel.assertExchange(EXCHANGE, 'direct', { durable: false });
            const queue = await this.channel.assertQueue('USER', { durable: false, exclusive: false })
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
            if (msg) {
                const parsed = JSON.parse(msg.content.toString())
                const routingKey = msg.fields.routingKey;
                console.log(`Recieved message with${routingKey} and content-${parsed}`)
                if (routingKey === 'company') {

                } else if (routingKey === 'user') {
                    let user = await createUser({
                        name:parsed?.name,
                        email:parsed?.email,
                        password:parsed?.password,
                        role: parsed?.role
                    })
                    console.log(user,'-----------user saved -------------')
                }
                this.channel.ack(msg)
            }
        } catch (error) {

        }
    }
}