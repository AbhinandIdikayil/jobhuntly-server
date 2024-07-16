import { CompanyEntity } from "../entities";


export interface IUpdateProfieUsecase {
    execute(data:CompanyEntity,email: string): Promise<CompanyEntity | null>
}