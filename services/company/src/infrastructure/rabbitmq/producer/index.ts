import { RabbitMQClient } from ".."


export class ProducerHandler {
    private rabbitMQ: RabbitMQClient 
    constructor(rabbitMQ:RabbitMQClient) {
        this.rabbitMQ = rabbitMQ
    }
    async sendEmail(message: any,): Promise<void> {
        await this.rabbitMQ.connect('amqp:.//localhost')
        try {
            switch (message) {
                case '':
                    await this.rabbitMQ.publihMessage('',message)
                    break;
            
                default:
                    break;
            }
        } catch (error) {
            
        }
    }
}