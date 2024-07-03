import { UserEntity } from "../../domain/entities";



export interface IRepositories  {
    signup:(data:UserEntity) => Promise<UserEntity | null>
    login:(email:string,password:string) => Promise<UserEntity | null>
}