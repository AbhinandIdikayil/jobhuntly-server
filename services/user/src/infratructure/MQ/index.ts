import { Channel, Connection } from "amqplib";
import amqplib from 'amqplib'

const ROUTING_KEY = ['user', 'fg-ps-user']

export class RabbitMQClient {
    private connection: Connection | null = null;
    private channels: Map<string, Channel> = new Map();
    private exchange = 'direct_logs'

    constructor(
        private readonly connectionString: string
    ) { }

    async connect(): Promise<void> {
        this.connection = await amqplib.connect(this.connectionString)
    }

    async getChannel(queueName: string): Promise<Channel> {
        if (this.channels.has(queueName)) {
            return this.channels.get(queueName)!;
        }
        if (!this.connection) {
            throw new Error("Connection not established. Call connect() first.");
        }
        const channel = await this.connection.createChannel();
        this.channels.set(queueName, channel);
        return channel
    }

    async consumeMessages(queueName: string, callback: (message: any) => Promise<boolean>) {
        const channel = await this.getChannel(queueName);
        // await channel.assertQueue(queueName, { durable: false });
        // channel.consume(queueName, async (msg) => {
        //     if (msg !== null) {
        //         const message = JSON.parse(msg.content.toString());
        //         await callback(message);
        //         channel.ack(msg);
        //     }
        // });
        await channel.assertExchange(this.exchange, 'direct', { durable: false });
        const queue = await channel.assertQueue(queueName, { durable: false, exclusive: false })
        if (ROUTING_KEY.length > 0) {
            for (const routing of ROUTING_KEY) {
                await channel.bindQueue(queue.queue, this.exchange, routing)
            }

            await channel.consume(
                queue.queue, async (msg) => {
                    if (msg !== null) {
                        const message = JSON.parse(msg.content.toString());
                        console.log(message)
                        let response: boolean = await callback(msg);
                        console.log(response)
                        if (response) {
                            channel.ack(msg);
                        } else {
                            channel.nack(msg)
                        }
                    }
                },
                { noAck: false })
        }
    }


    async publishMessage(queueName: string, ROUTING_KEY: string, message: any): Promise<void> {
        const channel = await this.getChannel(queueName);
        channel.publish(this.exchange, ROUTING_KEY, Buffer.from(JSON.stringify(message)))
    }

    async close(): Promise<void> {
        for (const channel of this.channels.values()) {
            await channel.close();
        }
        if (this.connection) {
            await this.connection.close();
        }
    }

}