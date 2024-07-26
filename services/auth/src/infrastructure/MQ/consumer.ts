import { RabbitMQClient } from ".";
import { blockUser } from "../database/mongodb/repositories/blockUser";

const QUEUE = 'USER'


export class ConsumerService {
    private rabbitMQClient: RabbitMQClient
    private isShuttingDown = false

    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString)
    }

    async start(): Promise<void> {
        await this.rabbitMQClient.connect();
        console.log(`
=============================
= USER SRV CONSUMER STARTED =      
=============================
            `)

        await this.rabbitMQClient.consumeMessage(QUEUE, async function (message: any): Promise<boolean> {
            try {
                if (message) {
                    console.log(message?.fields)
                    if (message.fields.routingKey === 'blocked') {
                        const parsed = JSON.parse(message.content.toString());
                        let blockedUser = await blockUser(parsed);
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }
            } catch (error) {
                console.log(error)
                return false
            }
        })


        process.on('SIGINT',this.gracefulShutDown)
        process.on('SIGTERM',this.gracefulShutDown)
    }


    private gracefulShutDown = async (): Promise<void> => {
        if (this.isShuttingDown) return;
        this.isShuttingDown = true;

        console.log('Shutting down consumer service...');
        await this.rabbitMQClient.close();
        console.log('Consumer service shut down gracefully.');
        process.exit(0);
    };
}