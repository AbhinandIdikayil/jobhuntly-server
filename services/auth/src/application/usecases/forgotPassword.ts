import { IDependencies } from "../interfaces/IDependencies"



export const forgotPasswordUsecase = (dependencies:IDependencies) => {
    const {repositories:{forgotPassword}} = dependencies
    return {
        execute: async (email: string,password:string) => {
            try {
                return await forgotPassword(email,password)
            } catch (error) {
                throw error
            }
        }
    }
}