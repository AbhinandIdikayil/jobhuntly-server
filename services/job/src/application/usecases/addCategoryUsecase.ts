import { CategoryEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"



export const addCategoryUsecase = (dependencies:IDependencies) => {
    const {repositories:{addCategory}} = dependencies
    return {
        execute: async (data:CategoryEntity) => {
            try {
                return await addCategory(data)
            } catch (error) {
                throw error
            }
        }
    }
}