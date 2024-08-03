import { IDependencies } from "../interfaces/IDependencies"


export const applyForJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { applyForJob } } = dependencies
    return {
        execute: async (userid: string,jobid: string ,resume:string) => {
            try {
                return await applyForJob(userid, jobid ,resume)
            } catch (error) {
                throw error
            }
        }
    }
}