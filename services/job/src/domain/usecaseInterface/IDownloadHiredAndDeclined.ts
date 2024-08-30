import { ApplicantsEntity } from "../entities";


export interface IDownloadHiredAndDeclined {
    execute(id: string): Promise<ApplicantsEntity[] | null>
}