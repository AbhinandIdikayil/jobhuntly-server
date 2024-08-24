import { MessageEntity } from "../entities";

export interface  IGetMessageUsecase {
    execute(id: string): Promise<MessageEntity[] | null>
}