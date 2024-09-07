import { Message } from "amqplib"
import { MessageEntity } from "../../../../domain/entities"
import { messageModel } from "../model/MessageSchema"


export const updateMessage = async (data: MessageEntity): Promise<MessageEntity | null> => {
    try {
        if (data?._id) {
            const updateMessage = await messageModel.findByIdAndUpdate(
                { _id: data?._id },
                { $set: data },
                {new : true}
            )
            return updateMessage ? updateMessage as unknown as MessageEntity : null
        } else {
            return null
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}