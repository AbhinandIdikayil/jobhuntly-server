import { IDependencies } from "../interfaces/IDependencies"

export const scheduleInterviewUsecase = (dependencies: IDependencies) => {
    const { repositories: { scheduleInterview } } = dependencies
    return {
        execute: async (applicantId: string,time:string,date:string,type:string, room:string) => {
            try {
                return await scheduleInterview(applicantId,time,date,type,room)
            } catch (error) {
                throw error
            }
        }
    }
}