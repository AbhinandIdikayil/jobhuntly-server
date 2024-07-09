import { IDependencies } from "../interfaces/IDependencies"



export const getAllUserUsecase = (dependencies:IDependencies) => {
    const {repositories:{getAllUser}} = dependencies
    return {
        execute: async () => {
            try {
                return await getAllUser()
            } catch (error: Error | any) {
                throw new Error(error)
            }
        }
    }
}