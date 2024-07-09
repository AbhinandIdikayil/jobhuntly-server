import { UserEntity } from "../../domain/entities/user.entity";



export interface IRepositories {
    createUser(data:UserEntity): Promise<UserEntity | null>
}