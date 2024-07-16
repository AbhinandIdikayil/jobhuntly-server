import { CompanyEntity } from "../entities";



export interface IUpdateSocialLinksUsecase {
    execute(data: CompanyEntity, email: string): Promise<CompanyEntity | null>
}