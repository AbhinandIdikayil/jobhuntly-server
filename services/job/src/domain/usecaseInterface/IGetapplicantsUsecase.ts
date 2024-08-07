import { ApplicantsEntity } from "../entities";


export interface IGetAppilcantsUsecase {
    execute(companyId: string): Promise<ApplicantsEntity[] | null>
}