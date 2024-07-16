import { UserEntity } from "../entities";



export interface IGoogleUsecase {
    execute(email:string,name:string,role: string): Promise<UserEntity | null >
}