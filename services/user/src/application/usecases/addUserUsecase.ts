import { UserEntity } from "../../domain/entities/user.entity"
import { IDependencies } from "../interfaces/IDependencies"


export const addUserUsecase = (dependencies:IDependencies) => {
    const {repositories:{createUser}} = dependencies
    return {
        execute: async (data:UserEntity) => {
            try {   
                return await createUser(data)
            } catch (error: any) {
                throw new Error(error)
            }
        }
    }
}