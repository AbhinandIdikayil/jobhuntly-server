import { Email } from "../entities";


export interface IVerifyEmail {
    execute(email:string,otp: string): Promise<Email | null>
}