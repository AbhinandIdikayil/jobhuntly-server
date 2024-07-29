import { CompanyEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"


export const addCompanyUsecase = (dependencies: IDependencies) => {
    const { repositories: { addCompany } } = dependencies
    return {
        execute: async (data:CompanyEntity) => {
            try {
                return await addCompany(data)
            } catch (error) {
                throw error
            }
        }
    }
}