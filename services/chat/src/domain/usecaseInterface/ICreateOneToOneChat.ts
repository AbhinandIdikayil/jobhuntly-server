import { ChatEntity } from "../entities";


export interface ICreateOneToOneChat {
    execute(data:ChatEntity) : Promise<ChatEntity | null>
}