import { IDependencies } from "../interfaces/IDependencies";


export const getCompanyDetailsUsecae = (dependencies: IDependencies) => {
    const { repositories: { getCompanyDetails } } = dependencies
    return {
        execute: async (id:string) => {
            try {
                return await getCompanyDetails(id)
            } catch (error) {
                throw error
            }
        }
    }

}