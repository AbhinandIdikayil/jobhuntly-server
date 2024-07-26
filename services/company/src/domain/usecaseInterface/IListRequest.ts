import { CompanyEntity } from "../entities";


export interface IListRequest {
    execute(): Promise<CompanyEntity | null>
}