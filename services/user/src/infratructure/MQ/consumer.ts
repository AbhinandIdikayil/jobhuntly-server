import { text } from "express";
import { RabbitMQClient } from ".";
import { createUser, updatePassword } from "../database/mongodb/repositories";

const EXCHANGE = 'direct_logs'
const QUEUE = 'USER'


export class ConsumserSevice {
    private rabbitMQClient: RabbitMQClient
    private isShuttingDown = false

    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString)
    }
    async start(): Promise<void> {
        await this.rabbitMQClient.connect();
        console.log(`
-----------------    
consumer started 
-----------------
            `)
        // Consume messages from different queues
        this.rabbitMQClient.consumeMessages(QUEUE,async function (msg): Promise<boolean>  {
            try {
                if (msg) {
                    console.log(msg?.fields)
                    if (msg.fields.routingKey === 'user') {
                        const parsed = JSON.parse(msg.content.toString())
                        const routingKey = msg.fields.routingKey;
                        console.log(`Recieved message with${routingKey} and content-${parsed}`)
                        let user = await createUser({...parsed})
                        console.log('-----user created------')
                        return true
                    } else if (msg?.fields?.routingKey === 'fg-ps-user') {
                        const parsed = JSON.parse(msg.content.toString())
                        let updatedDoc = await updatePassword(parsed.password, parsed.email)
                        if (updatedDoc) {
                            console.log('----------- password updated succesffully USER-----------')
                        }
                        return true

                    } else {
                        return false
                    }
                } else {
                    return false;
                }
            } catch (error) {
                console.log(error)
                return false
            }
        });

        // await this.rabbitMQClient.consumeMessages('queue2', async (message):  => {
        //     console.log('Received message from Queue 2:', message);
        //     // Process the message
        // });

        process.on('SIGINT', this.gracefulShutDown);
        process.on('SIGTERM', this.gracefulShutDown);
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
