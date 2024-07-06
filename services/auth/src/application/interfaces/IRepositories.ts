import { UserEntity } from "../../domain/entities";


interface signupResponse {
    email: string,
    name: string,
    password: string,
    otp: string
}



export interface IRepositories {
    signup: (data: UserEntity) => Promise<signupResponse | null>
    login: (email: string, password: string) => Promise<UserEntity | null>
    googleAuth: (email: string, name: string) => Promise<UserEntity | null>
    verifyOtp:(email:string,otp:string,name:string,password:string,role:string) => Promise<UserEntity | null>
}