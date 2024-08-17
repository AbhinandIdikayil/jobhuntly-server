import { IDependencies } from "../interfaces/IDependencies"

export const scheduleInterviewUsecase = (dependencies: IDependencies) => {
    const { repositories: { scheduleInterview } } = dependencies
    return {
        execute: async (applicantId: string,time:string,date:string,type:string) => {
            try {
                return await scheduleInterview(applicantId,time,date,type)
            } catch (error) {
                throw error
            }
        }
    }
}