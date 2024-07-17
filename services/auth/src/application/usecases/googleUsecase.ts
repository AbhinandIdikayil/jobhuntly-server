import { IDependencies } from "../interfaces/IDependencies";



export const googleAuthUsecase = (dependencies:IDependencies) => {
    const {repositories:{googleAuth}} = dependencies
    return {
        execute: async (email:string,name:string,role: string) => {
            try {
                return await googleAuth(email,name,role)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}