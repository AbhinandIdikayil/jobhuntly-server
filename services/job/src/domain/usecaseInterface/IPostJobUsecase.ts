import { JobEntity } from "../entities";


export interface IPostJobUsecase {
    execute(data:JobEntity): Promise<JobEntity | null>
}