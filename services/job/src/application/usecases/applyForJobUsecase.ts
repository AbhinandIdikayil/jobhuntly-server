import { IDependencies } from "../interfaces/IDependencies"


export const applyForJobUsecase = (dependencies: IDependencies) => {
    const { repositories: { applyForJob } } = dependencies
    return {
        execute: async (userid: string,jobid: string ,resume:string,companyId:string) => {
            try {
                return await applyForJob(userid, jobid ,resume,companyId)
            } catch (error) {
                throw error
            }
        }
    }
}