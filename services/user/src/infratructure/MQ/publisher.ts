import { RabbitMQClient } from ".";


export class ProducerService {
    private rabbitMQClient: RabbitMQClient;
    private isShuttingDown = false;

    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString)
    }

    async start(): Promise<void> {
        await this.rabbitMQClient.connect()
        console.log(`
====================
= PRODUCER STARTED =
====================
        `)
    }

    //! SEND DATA TO USER QUEUE WHILE BLOCK OR UNBLOCK A USER
    publishToUser = async (message: any): Promise<void> => {
        await this.rabbitMQClient.publishMessage('USER', 'blocked', message);
    };

    publishToQueue2 = async (message: any): Promise<void> => {
        await this.rabbitMQClient.publishMessage('queue2', 'hai', message);
    };


    async close(): Promise<void> {
        process.on('SIGINT',this.gracefulShutDown)
        process.on('SIGTERM',this.gracefulShutDown)
    }

    private gracefulShutDown = async (): Promise<void> => {
        if(this.isShuttingDown) return
        this.isShuttingDown = true
        console.log('Producer service started shutting down....')
        await this.rabbitMQClient.close()
        console.log('Producer service has been shut downed....')
    }
}