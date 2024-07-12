import { IDependencies } from "../interfaces/IDependencies"



export const verifyEmailUsecase = (dependencies: IDependencies) => {
    const {repositories:{verifyEmail}} = dependencies
    return {
        execute: async (email:string,otp: string)  => {
            try {
                return await verifyEmail(email,otp)  
            } catch (error: any | Error) {
                throw error
            }
        }
    }
}