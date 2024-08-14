import { Types } from "mongoose"
import { ChatEntity } from "../../../../domain/entities"
import { chatModel } from "../model/ChatSchema"

export const listChats = async (id: string): Promise<ChatEntity[] | null> => {
    try {
        let _id = new Types.ObjectId(id)
        const chats = await chatModel.find({ members: { $in: [_id ] } })
        if(chats?.length > 0){
            return chats as unknown as ChatEntity[]
        } else {
            return []
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}