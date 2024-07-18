import { RabbitMQClient } from ".";


export class ProducerService {
    private rabbitMQClient: RabbitMQClient;

    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString)
    }

    async start(): Promise<void> {
        await this.rabbitMQClient.connect()
    }
    publishToQueue1 = async (message: any): Promise<void> => {
        await this.rabbitMQClient.publishMessage('queue1','hai', message);
    };

    publishToQueue2 = async (message: any): Promise<void> => {
        await this.rabbitMQClient.publishMessage('queue2','hai', message);
    };
}