import { UserEntity } from "../entities";



export interface IGoogleUsecase {
    execute(email:string,name:string): Promise<UserEntity | null >
}