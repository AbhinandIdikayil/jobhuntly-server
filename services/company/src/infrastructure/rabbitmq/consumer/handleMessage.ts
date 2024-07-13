import { Channel } from "amqplib";
import { createCompany, updatePassword } from "../../database/mongodb/repositories";



export async function consumeMessage(msg: any | null,key:string, channel: Channel | null): Promise<void> {
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
            channel?.ack(msg)
        } else if (key == 'fg-ps-company') {
            let email = msg?.email;
            let password = msg?.password
            let data = await updatePassword(email , password)
            if(data) {
                console.log('----------- company password updated ------------')
            }
        }
    } catch (error: any) {
        console.log(error)
        // throw new Error(error)
    }
}   