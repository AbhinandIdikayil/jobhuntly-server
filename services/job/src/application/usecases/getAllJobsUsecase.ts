import { filterPagination } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"

export const getAllJobsUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllJobs } } = dependencies
    return {
        execute: async (companyId: string, option?:filterPagination) => {
            try {
                if (companyId) {
                    return await getAllJobs(companyId, option)
                } else {
                    return await getAllJobs(undefined,option)
                }
            } catch (error) {
                throw error
            }
        }
    }
}