import { UserEntity } from "../entities";


export interface IGetAllUserUsecase {
    execute(): Promise<UserEntity[] | null>
}