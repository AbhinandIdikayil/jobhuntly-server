import { UserEntity } from "../entities";

interface signupResponse {
    email: string,
    name: string,
    password: string,
    otp: string,
    role: string
}


export interface ISignupUsecase {
    execute(data:UserEntity): Promise<signupResponse | null>
}