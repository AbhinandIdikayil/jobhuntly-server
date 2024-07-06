import { IDependencies } from "../interfaces/IDependencies"


export const verifyOtpUsecase = (dependencies:IDependencies) => {
    const {repositories:{verifyOtp}} = dependencies
    return {
        execute: async (email:string,otp:string,name:string,password:string,role:string) => {
            try {
                return await verifyOtp(email,otp,name,password,role)
            } catch (error: any | Error) {
                throw error
            }
        }
    }
}