import { IDependencies } from "../interfaces/IDependencies"


export const jobDetailsUsecae = (dependencies: IDependencies) => {
    const { repositories: { jobDetails } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await jobDetails(id)
            } catch (error) {
                throw error
            }
        }
    }
}