import { UserEntity } from "../entities/user.entity";


export interface addUserUsecase {
    execute(data:UserEntity): Promise<UserEntity | null>
}