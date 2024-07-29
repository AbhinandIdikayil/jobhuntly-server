import { JobEntity } from "../../domain/entities"
import { IDependencies } from "../interfaces/IDependencies"



export const postJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { postJob } } = dependencies
    return {
        execute: async (data:JobEntity) => {
            try {
                return await postJob(data)
            } catch (error) {
                throw error
            }
        }
    }
}