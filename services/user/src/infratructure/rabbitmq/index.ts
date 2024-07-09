import amqplib, { Channel, Connection } from 'amqplib'

export class RabbitMQClient {
    private static instance: RabbitMQClient
    private connection: Connection | null = null
    private channel: Channel | null = null


    private constructor() { }


    public static getInstance(): RabbitMQClient {
        if (!RabbitMQClient.instance) {
            RabbitMQClient.instance = new RabbitMQClient()
        }
        return RabbitMQClient.instance
    }

    async connect(url: string): Promise<void> {
        try {
            this.connection = await amqplib.connect(url)
            this.channel = await this.connection.createChannel()
        } catch (error) {
            console.log(error)
        }
    }

    getChannel(): Channel {
        if(!this.channel){
            throw new Error('rabbitqm channel not initialized')
        }
        return this.channel
    }  
    
    async close(): Promise<void> {
        if(this.channel){
            await this.channel.close()
        }
        if(this.connection){
            await this.connection.close()
        }
    }
}

