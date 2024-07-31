import { JobEntity } from "../entities";


export interface IGetAlljobs {
    execute(): Promise<JobEntity[] | null>
}