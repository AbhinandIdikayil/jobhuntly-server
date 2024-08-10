import { filterPagination, getAllJobsEntity, JobEntity } from "../entities";


export interface IGetAlljobs {
    execute(companyId?: string,option?:filterPagination): Promise<getAllJobsEntity[] | null>
}