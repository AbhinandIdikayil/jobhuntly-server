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
========================
= PRODUCER SRV STARTED =
========================
`)
    }

    publishToEmailQueue = async (message: any): Promise<void> => {
        console.log(message)
        switch (message.role) {
            case 'user':
                await this.rabbitMQClient.publishMessage('OTPEMAIL', 'email-otp-user', message);
                break;
            case 'company':
                await this.rabbitMQClient.publishMessage('OTPEMAIL', 'email-otp-cmpny', message);
                break;
            default:
                console.log(`
---------------
- INALID ROLE -
---------------          
                `)
                break;
        }
    };

    //$  THIS CODE IS MAINLY FOR TO SEND THE DATA OF USER OR COMPANY TO THEIR OWN SERVICES
    //$ WHENEVER THEY VERIFIED THEIR OTP THROUGH SIGNUP
    publishToUserQueue = async (message: any): Promise<void> => {
        switch (message.role) {
            case 'user':
                await this.rabbitMQClient.publishMessage('USER', 'user', message)
                break;
            case 'company':
                await this.rabbitMQClient.publishMessage('COMPANY', 'company', message)
                break;
            default:
                console.log(`
---------------
- INALID ROLE -
---------------          
`)
                break;
        }
    }


    //$ THIS IS USED TO SEND THE PASSWORD TO USER OR COMPANY SERVICE WHENEVER USER CHANGED THE PASSWORD 
    //$ THROUGH FORGOTPASSWORD API

    publishToUserQueueForPassword = async (message: any) => {
        switch (message.role) {
            case 'user':
                await this.rabbitMQClient.publishMessage('USER','fg-ps-user',message)
                break;
            case 'company':
                await this.rabbitMQClient.publishMessage('COMPANY','fg-ps-company',message)
                break;

            default:
                console.log(`
---------------
- INALID ROLE -
--------------- `)
            break;
        }
    }


    async close ():Promise<void> {
        process.on('SIGINT',this.graceFulShotDown)
        process.on('SIGTERM',this.graceFulShotDown)
    }

    private graceFulShotDown = async (): Promise<void> => {
        if(this.isShuttingDown) return
        this.isShuttingDown = true
        console.log('Producer service shutting down.......')
        await this.rabbitMQClient.close();
        console.log('Producer service has been shut downed')
    }
}