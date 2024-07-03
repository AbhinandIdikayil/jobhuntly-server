import { UserEntity } from "../entities";


export interface ILoginUsecase {
    execute(email:string , password:string): Promise<UserEntity | null>
}