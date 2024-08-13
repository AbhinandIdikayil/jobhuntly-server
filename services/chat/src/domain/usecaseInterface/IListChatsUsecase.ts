import { ChatEntity } from "../entities";

export interface IListChatsUsecase {
    execute(id: string): Promise<ChatEntity[] | null>
}