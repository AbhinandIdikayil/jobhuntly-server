import { RabbitMQClient } from ".";


export class ProducerService {
    private rabbitMQClient: RabbitMQClient
    private isShuttingDown = false;
    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString)
    }

    async start(): Promise<void> {
        await this.rabbitMQClient.connect()
        console.log(`
-----------------------------
----- PRODUCER STARTED ------
-----------------------------
            `)
    }

    publishToEmailQueue = async (message: any): Promise<void> => {
        switch (message.role) {
            case 'shortlisted':
                await this.rabbitMQClient.publishMessage('OTPEMAIL', 'shortlisted', message)
                break;
            case 'interview':
                await this.rabbitMQClient.publishMessage('OTPEMAIL', 'interview', message)
                break;
            default:
                console.log(`
####################################
####### INVALID RORING KEY #########
####################################    
                `)
        }
    }

    async close(): Promise<void> {
        process.on('SIGINT', this.graceFulShotDown)
        process.on('SIGTERM', this.graceFulShotDown)
    }

    private graceFulShotDown = async (): Promise<void> => {
        if (this.isShuttingDown) return
        this.isShuttingDown = true
        console.log('Producer service shutting down.......')
        await this.rabbitMQClient.close();
        console.log('Producer service has been shut downed')
    }
}