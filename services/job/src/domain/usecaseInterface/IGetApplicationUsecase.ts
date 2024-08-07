import { ApplicationEntity } from "../entities";


export interface IGetAppilcationUsecase {
    execute(userid: string): Promise<ApplicationEntity[] | null>
}