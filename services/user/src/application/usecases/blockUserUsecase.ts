import { IDependencies } from "../interfaces/IDependencies"



export const blockUserUsecase = (dependencies:IDependencies) => {
    const {repositories:{blockUser}} = dependencies
    return {
        execute: async (email:string) => {
            try {
                return await blockUser(email)
            } catch (error) {
                throw error
            }
        }
    }
}