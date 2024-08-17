import { ApplicantsEntity } from "../entities";

export interface IScheduleInterviewUsecase {
    execute(applicantId: string,time:string,date:string,type:string): Promise<ApplicantsEntity | null>
}