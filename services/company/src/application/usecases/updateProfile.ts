import { CompanyEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";


export const updateProfileUsecase = (dependencies:IDependencies) => {
    const {repositories:{updateProfile}} = dependencies
    return {
        execute: async (data:CompanyEntity,email: string) => {
            try {
                return await updateProfile(data,email)
            } catch (error) {
                throw error
            }
        }
    }
}