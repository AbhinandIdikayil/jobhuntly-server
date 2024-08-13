import { ChatEntity } from "../../../../domain/entities"
import { chatModel } from "../model/ChatSchema"


export const createOneToOnechat = async (data: ChatEntity): Promise<ChatEntity | null> => {
    try {
        if (data) {
            const existingChat = await chatModel.findOne({ members: { $all: data.members } });
            if(existingChat) {
                console.log('existing chat is here')
                return existingChat as unknown as ChatEntity
            }
            const chat = await chatModel.create({ ...data })
            if (chat) {
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