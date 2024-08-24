import { ApplicantsEntity } from "../entities";


export interface IEditInterviewUsecase {
    execute(applicantId: string, data:any, index:number): Promise<ApplicantsEntity | null>
}