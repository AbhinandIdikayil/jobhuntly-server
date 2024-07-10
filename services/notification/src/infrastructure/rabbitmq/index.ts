import amqplib, { Channel, Connection } from 'amqplib'

export interface IMessage {
    content: string;
    routingKey: string;
}

export class RabbitMQ {
    private connection: Connection | null = null;
    private channel: Channel | null = null
    private readonly url: string;
    private readonly exchange: string
    private readonly queueName: string;
    private readonly routingKeys: string[]

    constructor(url: string, exchange: string, queueName: string, routingKeys: string[]) {
        this.url = url;
        this.exchange = exchange
        this.queueName = queueName
        this.routingKeys = routingKeys
    }

    async connect(): Promise<void> {
        try {
            this.connection = await amqplib.connect(this.url);
            this.channel = await this.connection.createChannel();

            await this.channel.assertExchange(this.exchange, 'direct', { durable: false });
            await this.channel.assertQueue(this.queueName, { durable: false, exclusive: false });
            for (const key of this.routingKeys) {
                await this.channel.bindQueue(this.queueName, this.exchange, key);
            }
        } catch (error) {
            console.log(error)
        }
    }

    async consumeMessage(callback: (message: IMessage) => void): Promise<void> {
        if (!this.channel) {
            throw new Error('Channel is not initialized')
        }

        await this.channel.consume(this.queueName, (msg) => {
            if (msg) {
                const parsed = JSON.parse(msg.content.toString())
                const message: IMessage = {
                    content: parsed,
                    routingKey: msg.fields.routingKey
                }
                callback(message)  
                this.channel?.ack(msg)
            }
        }, { noAck: false }) 
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