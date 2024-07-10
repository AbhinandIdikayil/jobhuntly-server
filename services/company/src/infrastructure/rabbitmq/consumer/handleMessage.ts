import { Channel } from "amqplib";
import { createCompany } from "../../database/mongodb/repositories";



export async function consumeMessage(msg: any | null, channel: Channel | null): Promise<void> {
    try {
        console.log('Recieved message', msg)
        let data = await createCompany({
            name: msg?.name,
            email: msg?.email,
            password: msg?.password, 
        })
        if(data){
            console.log('ashwasam')
        }
    } catch (error: any) {
        throw new Error(error)
    }
}   