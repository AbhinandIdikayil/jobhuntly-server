import { RabbitMQ } from ".";



export class MessageHandler {
    private rabbitMQ: RabbitMQ
    constructor(rabbitMQ: RabbitMQ) {
        this.rabbitMQ = rabbitMQ
    }

    async startConsumer(): Promise<void> {
        await this.rabbitMQ.connect();
    }

    async sendEmail(message: any): Promise<void> {
        console.log(message)
        try {
            switch (message.role) {
                case 'user':
                    await this.rabbitMQ.publishMessage('email-otp-user', message)
                    break;
                case 'company':
                    await this.rabbitMQ.publishMessage('email-otp-cmpny', message)
                    break;

                default:
                    console.log('Invalid role')
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async sendUserData(message: any): Promise<void> {
        console.log(message);
        // await this.rabbitMQ.connect();
        try {
            switch (message.role) {
                case 'user':
                    await this.rabbitMQ.publishMessage('user', message)
                    break;
                case 'company':
                    console.log(`
                   ----------------
                   ----------------
                   ----------------
                   ----------------      
                        `)
                    await this.rabbitMQ.publishMessage('company', message)
                    break;
                default:
                    console.log('Invalid role')
                    break;
            }
        } catch (error) {
            console.log(error)
        }
    }
}