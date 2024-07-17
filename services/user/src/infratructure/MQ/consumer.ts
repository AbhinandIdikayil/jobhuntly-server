import { RabbitMQClient } from ".";


export class conumserSevice {
    private rabbitMQClient: RabbitMQClient

    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString)
    }
    async start(): Promise<void> {
        await this.rabbitMQClient.connect();

        // Consume messages from different queues
        await this.rabbitMQClient.consumeMessages('queue1', async (message) => {
            console.log('Received message from Queue 1:', message);
            // Process the message
        });

        await this.rabbitMQClient.consumeMessages('queue2', async (message) => {
            console.log('Received message from Queue 2:', message);
            // Process the message
        });
    }
}