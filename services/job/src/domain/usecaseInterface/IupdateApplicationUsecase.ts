import { ApplicantsEntity } from "../entities";


export interface IUpdateApplicationUsecase {
    execute(id: string): Promise<ApplicantsEntity | null>
}