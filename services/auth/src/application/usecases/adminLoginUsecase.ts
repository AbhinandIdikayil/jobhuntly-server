import { IDependencies } from "../interfaces/IDependencies"



export const adminLoginUsecase = (dependencies: IDependencies) => {
    const { repositories: { adminLogin } } = dependencies
    return {
        execute: async (email: string,password: string) => {
            try {
                return await adminLogin(email , password)
            } catch (error) {
                throw error
            }
        }
    }
}