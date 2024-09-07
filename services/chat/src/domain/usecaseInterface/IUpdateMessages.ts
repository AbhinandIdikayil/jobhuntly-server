import { MessageEntity } from "../entities";


export interface IUpdateMessages {
    execute(data:MessageEntity): Promise<MessageEntity | null>
}