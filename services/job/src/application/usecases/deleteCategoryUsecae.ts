import { IDependencies } from "../interfaces/IDependencies"



export const deleteCategoryUsecase = (dependencies: IDependencies) => {
    const { repositories: { deleteCategory } } = dependencies
    return {
        execute: async (id: string) => {
            try {
                return await deleteCategory(id)
            } catch (error) {
                throw error
            }
        }
    }
}