import { Types } from "mongoose"
import { MessageEntity } from "../../../../domain/entities"
import { messageModel } from "../model/MessageSchema"

export const getMessages = async (id: string): Promise<MessageEntity[] | null> => {
    try {
        const messages = await messageModel.aggregate([
            {
                $match: { chatId: new Types.ObjectId(id) }
            },
            {
                $lookup: {
                    from: 'chats',
                    localField: 'chatId',
                    foreignField: '_id',
                    as: 'chat'
                }
            }
        ])
        if (messages.length > 0) {
            return messages as MessageEntity[]
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}