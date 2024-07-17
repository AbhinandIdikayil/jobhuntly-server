import { UserEntity } from "../entities";


export interface IAdminLoginUsecase {
    execute:(email: string,password: string) => Promise<UserEntity | null>
}