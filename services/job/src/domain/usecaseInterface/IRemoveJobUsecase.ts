import { JobEntity } from "../entities";


export interface IRemoveJobUsecase {
    execute(id: string): Promise<JobEntity | null>
}