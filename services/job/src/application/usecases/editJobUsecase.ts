import { JobEntity } from "../../domain/entities";
import { IDependencies } from "../interfaces/IDependencies";

export const editJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { editJob } } = dependencies
    return {
        execute: async (id: string,data:JobEntity) => {
            try {
                return await editJob(id,data)
            } catch (error) {
                throw error
            }
        }
    }
}