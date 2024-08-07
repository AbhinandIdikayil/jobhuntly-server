import { IDependencies } from "../interfaces/IDependencies"

export const getAllJobsUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllJobs } } = dependencies
    return {
        execute: async (companyId: string) => {
            try {
                if (companyId) {
                    return await getAllJobs(companyId)
                } else {
                    return await getAllJobs()
                }
            } catch (error) {
                throw error
            }
        }
    }
}