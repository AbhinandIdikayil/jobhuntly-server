import { Message } from "amqplib";
import { RabbitMQClient } from ".";
import { createCompany, updatePassword } from "../database/mongodb/repositories";


const QUEUE = 'COMPANY'

export class ConsumerService {
    private rabbitMQClient: RabbitMQClient
    private isShuttingDown = false


    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString);
    }
    async start(): Promise<void> {
        await this.rabbitMQClient.connect()
        console.log(`
----------------------------
- CONSUMER STARTED RUNNING -
----------------------------
`)

        await this.rabbitMQClient.consumeMessage(QUEUE, async (message: Message): Promise<boolean> => {
            let msg = JSON.parse(message.content.toString());
            let key = message.fields.routingKey
            if (key == 'company') {
                let data = await createCompany({
                    name: msg?.name,
                    email: msg?.email,
                    password: msg?.password,
                })
                if (data) {
                    console.log('----------- company has been created -------')
                    return true
                } else {
                    return false
                }
            } else if (key == 'fg-ps-company') {
                let email = msg?.email;
                let password = msg?.password
                let data = await updatePassword(email, password)
                if (data) {
                    console.log('----------- company password updated ------------')
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        })

        process.on('SIGINT', this.gracefulShutDown)
        process.on('SIGTERM', this.gracefulShutDown)
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