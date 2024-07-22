import { Email, UserEntity } from "../../domain/entities";


interface signupResponse {
    email: string,
    name: string,
    password: string,
    otp: string,
    role: string
}


export interface IRepositories {
    signup: (data: UserEntity) => Promise<signupResponse | null>
    login: (email: string, password: string) => Promise<UserEntity | null>
    googleAuth: (email: string, name: string,role:string,page: string) => Promise<UserEntity | null>
    verifyOtp:(email:string,otp?:string,name?:string,password?:string,role?:string) => Promise<UserEntity | null>
    verifyEmail:(email:string,otp:string) => Promise<Email | null>
    forgotPassword:(email: string,password:string) => Promise<any | null>
    adminLogin:(email: string , password: string) => Promise<UserEntity | null>
}