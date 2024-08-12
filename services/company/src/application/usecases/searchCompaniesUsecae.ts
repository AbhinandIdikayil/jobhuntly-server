import { IDependencies } from "../interfaces/IDependencies"

export const searchCompaniesUsecae = (dependencies: IDependencies) => {
    const { repositories: { searchCompanies } } = dependencies
    return {
        execute: async (value: string) => {
            try {
                return await searchCompanies(value)
            } catch (error) {
                throw error
            }
        }
    }
}