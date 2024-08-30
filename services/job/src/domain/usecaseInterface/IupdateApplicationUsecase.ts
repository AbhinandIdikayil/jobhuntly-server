import { ApplicantsEntity } from "../entities";


export interface IUpdateApplicationUsecase {
    execute(id: string,hired?:boolean): Promise<ApplicantsEntity | null>
}