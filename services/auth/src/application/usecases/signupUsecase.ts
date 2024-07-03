import { sign } from "jsonwebtoken"
import { IDependencies } from "../interfaces/IDependencies"
import { UserEntity } from "../../domain/entities"


export const signupUsecase = (dependencies:IDependencies) => {
    const { repositories : {signup} } = dependencies
    return {
        execute:async (data:UserEntity) => {
            try {
                return await signup(data)
            } catch (error) {
                console.log(error)
                throw error
            }
        }
    }
}