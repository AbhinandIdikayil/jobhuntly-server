import { Channel, Connection } from "amqplib";
import amqplib from 'amqplib'

export interface IQandMessage {
    exchange: string,
    message: any,
    routingKey: string
}

export class RabbitMQ {
    private connection: Connection | null = null;
    private channel: Channel | null = null
    private readonly url: string | null = null
    private readonly exchange: string | null = null
    // private readonly routingKey: string | null = null
    private readonly queueName: string | null = null

    constructor(url: string, exchange: string,
        //  routingKey: string, 
        queueName?: string) {
        this.url = url
        this.exchange = exchange
        if (queueName) {
            this.queueName = queueName
        }
        // this.routingKey = routingKey
    }


    async connect(): Promise<void> {
        if (!this.url) {
            throw new Error("URL is required to connect to RabbitMQ.");
        }

        this.connection = await amqplib.connect(this.url);
        this.channel = await this.connection.createChannel();
        if (this.exchange && this.channel) {
            await this.channel.assertExchange(this.exchange, 'direct', { durable: false })
        }

        process.on('SIGINT', () => this.close());
        process.on('SIGTERM', () => this.close());
    }

    async publishMessage(routingKey: string, message: any): Promise<void> {
        if (!this.channel) {  
            throw new Error('Channel is not initialized')
        }
        if (this.exchange) {
            this.channel.publish(this.exchange, routingKey, Buffer.from(JSON.stringify(message)))
        }
    }  

    async close(): Promise<void> {
        if (this.channel) {
            await this.channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
    }
}