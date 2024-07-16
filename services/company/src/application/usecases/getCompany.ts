import { IDependencies } from "../interfaces/IDependencies"



export const getCompanyUsecase = (dependencies:IDependencies) => {
    const {repositories:{getCompany}} = dependencies
    return {
        execute: async (email: string) => {
            try {
                return await getCompany(email)
            } catch (error) {
                throw error
            }
        }
    }
}