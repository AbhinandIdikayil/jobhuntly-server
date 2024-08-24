import { filterPagination } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"


export const getAllCompanyUsecase = (dependencies: IDependencies) => {
    const { repositories: { getAllCompany } } = dependencies
    return {
        execute: async (option?:filterPagination) => {
            try {
                return await getAllCompany(option)
            } catch (error) {
                throw error
            }
        }
    }
}