import { getAllJobsEntity, JobEntity } from "../entities";


export interface IGetAlljobs {
    execute(companyId?: string): Promise<getAllJobsEntity[] | null>
}