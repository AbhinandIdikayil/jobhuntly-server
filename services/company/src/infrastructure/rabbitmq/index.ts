import amqplib, { Channel, Connection } from "amqplib";

const EXCHANGE = 'direct_logs';
const QUEUE = 'USER'
const ROUTING_KEY = ['company','fg-ps-company']


export class RabbitMQClient {
    private connection: Connection | null = null;
    private channel: Channel | null = null

    async connect(url: string): Promise<void> {
        this.connection = await amqplib.connect(url)
        this.channel = await this.connection.createChannel();


        await this.channel.assertExchange(EXCHANGE, 'direct', { durable: false });
        const queue = await this.channel.assertQueue(QUEUE, { durable: false, exclusive: false })
        if (ROUTING_KEY.length > 0) {
            for (const routing of ROUTING_KEY) {
                await this.channel.bindQueue(queue.queue, EXCHANGE, routing)
            }

        }
    }



    async getChannel(): Promise<Channel> {
        if (!this.connection) {
            this.connection = await amqplib.connect('amqp://localhost');
          }
          if (!this.channel) {
            this.channel = await this.connection.createChannel();
          }
          return this.channel;
    }

    async publihMessage(routingKey: string, message: any) {
        if (!this.channel) {
            throw new Error('Channel is not initialized')
        }
        if (EXCHANGE) {
            this.channel.publish(EXCHANGE, routingKey, Buffer.from(JSON.stringify(message)))
        }
    }



    async close(): Promise<void> {
        if (this.channel) {
            await this.channel.close()
        }
        if (this.connection) {
            await this.connection.close()
        }
    }
}

export const RabbitMQ = new RabbitMQClient()