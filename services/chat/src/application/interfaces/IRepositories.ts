import { ChatEntity } from "../../domain/entities";


export interface IRepositories {
    createOneToOnechat(data:ChatEntity): Promise<ChatEntity | null>
    listChats(id: string): Promise<ChatEntity[] | null>
}