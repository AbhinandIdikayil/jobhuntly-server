import { UserEntity } from "../entities";


export interface ISearchUsersUsecase {
    execute(value: string): Promise<UserEntity[] | null>
}