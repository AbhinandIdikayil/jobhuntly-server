import { UserEntity } from "../entities";


export interface IUpdateProfileUsecase {
    execute(data:UserEntity): Promise<UserEntity | null>
}