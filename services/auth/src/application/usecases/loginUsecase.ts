import { IDependencies } from "../interfaces/IDependencies";


export const loginUsecase =(dependencies:IDependencies) => {
    const {repositories:{login}} = dependencies
    return {
        execute: async (email:string,password:string) => {
            try {
                return await login(email,password)
            } catch (error) {
                throw error
            }
        }
    }
}