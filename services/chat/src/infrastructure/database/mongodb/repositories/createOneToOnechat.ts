import { ChatEntity } from "../../../../domain/entities"
import { chatModel } from "../model/ChatSchema"


export const createOneToOnechat = async (data:ChatEntity): Promise<ChatEntity | null> => {
    try {
        if(data) {
            const chat = await chatModel.create(data)
            if(chat) {
                return chat as unknown as ChatEntity
            } else {
                throw new Error('Error while creaing')
            }
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}