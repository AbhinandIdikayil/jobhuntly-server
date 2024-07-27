import { SectorEntity } from "../../entities";


export interface IAddSectorUsecase {
    execute(data:SectorEntity): Promise<SectorEntity | null>
}