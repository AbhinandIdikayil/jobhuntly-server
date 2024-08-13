import { MessageEntity } from "../../../../domain/entities"
import { messageModel } from "../model/MessageSchema"


export const sendMessage = async (data: MessageEntity): Promise<MessageEntity | null> => {
    try {
        if(data) {
            const message = await messageModel.create({
                ...data
            })
            if(message){
                return message as unknown as MessageEntity
            } else {
                return null
            }
        } else {
            throw new Error('pleae enter input')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}