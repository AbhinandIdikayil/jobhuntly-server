import { ApplicantsEntity } from "../entities";

export interface IGetSpecificApplicantUsecase {
    execute(id: string): Promise<ApplicantsEntity | null>
}