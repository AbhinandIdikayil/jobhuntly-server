import { JobEntity } from "../entities";


export interface IJobDetailsUsecase {
    execute(id:string): Promise<JobEntity[] | null>
}