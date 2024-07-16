import { Channel, ConsumeMessage } from "amqplib";
import { createCompany, updatePassword } from "../../database/mongodb/repositories";



export async function consumeMessage(msg: any | null,key:string, channel: Channel | null,rawMsg:ConsumeMessage): Promise<void> {
    try {
        console.log('Recieved message', msg)
        console.log(key)
        if(key == 'company') {
            let data = await createCompany({
                name: msg?.name,
                email: msg?.email,
                password: msg?.password, 
            })
            if(data){
                console.log('----------- company has been created -------')
            }
        } else if (key == 'fg-ps-company') {
            let email = msg?.email;
            let password = msg?.password
            let data = await updatePassword(email , password)
            if(data) {
                console.log('----------- company password updated ------------')
            }
        }
        channel?.ack(rawMsg)
    } catch (error: any) {
        channel?.nack(rawMsg,false,false)
        console.log(error)
        // throw new Error(error)
    }
}   