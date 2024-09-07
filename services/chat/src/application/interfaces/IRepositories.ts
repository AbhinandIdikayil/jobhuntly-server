import { ChatEntity, MessageEntity } from "../../domain/entities";


export interface IRepositories {
    createOneToOnechat(data:ChatEntity): Promise<ChatEntity | null>
    listChats(id: string): Promise<ChatEntity[] | null>
    sendMessage(data:MessageEntity): Promise<MessageEntity | null>
    getMessages(id: string): Promise<MessageEntity[] | null>
    updateMessage(data:MessageEntity): Promise<MessageEntity | null>
}