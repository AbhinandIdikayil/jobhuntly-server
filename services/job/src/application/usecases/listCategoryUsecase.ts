import { IDependencies } from "../interfaces/IDependencies"


export const listCategoryUsecase = (dependencies:IDependencies) => {
    const {repositories:{listCategory}} = dependencies
    return {
        execute: async () => {
            try {
                return await listCategory()
            } catch (error) {
                throw error
            }
        }
    }
}