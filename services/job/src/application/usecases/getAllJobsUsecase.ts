import { IDependencies } from "../interfaces/IDependencies"

export const getAllJobsUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllJobs } } = dependencies
    return {
        execute: async () => {
            try {
                return await getAllJobs()
            } catch (error) {
                throw error
            }
        }
    }
}