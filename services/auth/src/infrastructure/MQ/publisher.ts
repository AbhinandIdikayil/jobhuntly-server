import { RabbitMQClient } from ".";


export class ProducerService {
    private rabbitMQClient: RabbitMQClient
    constructor(connectionString: string) {
        this.rabbitMQClient = new RabbitMQClient(connectionString)
    }

    async start(): Promise<void> {
        await this.rabbitMQClient.connect()
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
                await this.rabbitMQClient.publishMessage('USER', 'company', message)
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
                await this.rabbitMQClient.publishMessage('USER','fg-ps-company',message)
                break;

            default:
                console.log(`
---------------
- INALID ROLE -
--------------- `)
            break;
        }
    }
}