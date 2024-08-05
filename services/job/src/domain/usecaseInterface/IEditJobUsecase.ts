import { JobEntity } from "../entities";

export interface IEditJobUsecase {
    execute(id: string, data:JobEntity): Promise<JobEntity | null>
}