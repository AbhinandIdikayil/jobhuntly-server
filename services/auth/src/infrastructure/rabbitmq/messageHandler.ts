import { RabbitMQ } from ".";



export class MessageHandler {
    private rabbitMQ: RabbitMQ
    constructor(rabbitMQ: RabbitMQ) {
        this.rabbitMQ = rabbitMQ
    }
    
    async sendEmail(message: any): Promise<void> {
        console.log(message)
        await this.rabbitMQ.connect();
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
        } finally {
            process.on('SIGINT', async () => {
                await this.rabbitMQ.close();
                process.exit(0);
            });
            process.on('SIGTERM', async () => {
                await this.rabbitMQ.close();
                process.exit(0);
            });
        }


    }
}