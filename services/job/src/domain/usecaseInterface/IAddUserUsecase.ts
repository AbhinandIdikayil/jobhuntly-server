import { UserEntity } from "../entities";

export interface IAddUserUsecase {
    execute(data:UserEntity): Promise<UserEntity | null>
} 