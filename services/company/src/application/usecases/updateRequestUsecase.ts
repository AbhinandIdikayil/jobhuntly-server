import { IDependencies } from "../interfaces/IDependencies"



export const updateRequestUsecase = (dependencies:IDependencies) => {
    const {repositories:{updateRequest}} = dependencies
    return {
        execute: async (email: string) => {
            try {   
                return await updateRequest(email)
            } catch (error) {
                throw error
            }
        }
    }
}