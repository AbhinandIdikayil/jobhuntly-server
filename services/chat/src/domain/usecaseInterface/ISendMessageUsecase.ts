import { MessageEntity } from "../entities";

export interface ISendMessageUsecase {
    execute(data:MessageEntity) : Promise<MessageEntity | null>
}