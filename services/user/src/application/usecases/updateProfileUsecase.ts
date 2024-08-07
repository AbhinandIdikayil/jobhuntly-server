import { UserEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"

export const updateProfileUsecase = (dependencies: IDependencies) => {
    const { repositories: { updateProfile } } = dependencies
    return {
        execute: async (data: UserEntity) => {
            try {
                return await updateProfile(data)
            } catch (error) {
                throw error
            }
        }
    }
}