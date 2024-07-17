import { CompanyEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"



export const updateSocialLinksUsecase = (dependencies: IDependencies) => {
    const { repositories: { updateSocialLinks } } = dependencies
    return {
        execute: async (data:CompanyEntity,email: string) => {
            try {
                return await updateSocialLinks(data,email)
            } catch (error) {
                throw error
            }
        }
    }
}