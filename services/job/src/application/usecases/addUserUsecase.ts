import { UserEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"



export const addUserUsecase = (dependencies: IDependencies) => {
    const { repositories: { addUser } } = dependencies
    return {
        execute: async (data:UserEntity) => {
            try {
                return await addUser(data)
            } catch (error) {
                throw error
            }
        }
    }
}