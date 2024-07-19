import { RabbitMQClient } from ".";


export class ProducerService {
    private rabbitMQClient: RabbitMQClient;

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
        await this.rabbitMQClient.publishMessage('USER','blocked', message);
    };

    publishToQueue2 = async (message: any): Promise<void> => {
        await this.rabbitMQClient.publishMessage('queue2','hai', message);
    };
}