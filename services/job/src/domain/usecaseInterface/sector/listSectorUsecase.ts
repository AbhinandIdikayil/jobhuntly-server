import { SectorEntity } from "../../entities";


export interface listSectorUsecase {
    execute(): Promise<SectorEntity[] | null>
}