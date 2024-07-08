import { RabbitMQ,IMessage } from './index'



export class MessageService {
    private rabbitMQ: RabbitMQ;

    constructor(rabbitMQ: RabbitMQ) {
        this.rabbitMQ = rabbitMQ
    }

    async start(): Promise<void> {
        await this.rabbitMQ.connect()
        await this.rabbitMQ.consumeMessage(this.handleMessage)
        console.log('-------------- starting to consume ------------')
    }

    private handleMessage = (message: IMessage): void => {
        console.log(` Recieved ${message}`)
        switch (message.routingKey) {
            case 'email-otp-user':
                console.log(message)
                break;
            case 'email-otp-cmpany':
                console.log(message)
                break;
        
            default:
                break;
        }
    }

    async close(): Promise<void> {
        await this.rabbitMQ.close()
    }
}