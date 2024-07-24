import { UserEntity } from "../entities";


export interface IGetUserUsecase {
    execute(email: string): Promise<UserEntity | null>
}