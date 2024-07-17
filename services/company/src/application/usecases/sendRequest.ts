import { IDependencies } from "../interfaces/IDependencies";



export const sendRequestUsecase = (dependencies:IDependencies) => {
    const {repositories:{sendRequest}} = dependencies
    return {
        execute: async (id: string,email: string) => {
            try {
                return await sendRequest(id,email)
            } catch (error) {
                throw error
            }
        }
    }
}