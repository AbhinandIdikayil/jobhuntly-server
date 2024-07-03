import { UserEntity } from "../entities";



export interface ISignupUsecase {
    execute(data:UserEntity): Promise<UserEntity | null>
}