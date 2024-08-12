import { UserEntity } from "../../domain/entities/user.entity";



export interface IRepositories {
    createUser(data:UserEntity): Promise<UserEntity | null>
    getAllUser(): Promise<UserEntity[] | null>
    blockUser(email: string): Promise<boolean | null>
    getUser(email: string): Promise<UserEntity | null>
    updateProfile(data:UserEntity): Promise<UserEntity | null>
    searchUsers(value:string): Promise<UserEntity[] | null>
}