import { sendOtpToUser, sendShortListedEmail } from './function/sendOtpMail';
import { RabbitMQ, IMessage } from './index'



export class MessageService {
    private rabbitMQ: RabbitMQ;

    constructor(rabbitMQ: RabbitMQ) {
        this.rabbitMQ = rabbitMQ
    }

    async start(): Promise<void> {
        try {
            
            await this.rabbitMQ.connect()
            await this.rabbitMQ.consumeMessage(this.handleMessage)
    
            console.log('-------------- starting to consume ------------')
        } catch (error) {
            console.log(error)
        }
    }

    private handleMessage = (message: IMessage): void => {
        console.log(` Recieved ${message}`)
        switch (message.routingKey) {
            case 'email-otp-user':
                console.log(message)
                sendOtpToUser(message)
                break;
            case 'email-otp-cmpany':
                console.log(message)
                break;
            case 'shortlisted':
                sendShortListedEmail(message)
                break;
            default:
                break;
        }
    }

    async close(): Promise<void> {
        await this.rabbitMQ.close()
    }
}