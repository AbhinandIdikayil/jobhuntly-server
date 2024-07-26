import { CategoryEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"


export const updateCategoryUsecase = (dependencies:IDependencies) => {
    const {repositories:{updateCategory}} = dependencies
    return {
        execute: async (data: CategoryEntity) => {
            try {
                return await updateCategory(data)
            } catch (error) {
                throw error
            }
        }
    }
}