import { UserEntity } from "../entities";


export interface IVerifyOtpUsecase {
    execute(email:string,otp:string,name:string,password:string,role:string): Promise<UserEntity | null>
}