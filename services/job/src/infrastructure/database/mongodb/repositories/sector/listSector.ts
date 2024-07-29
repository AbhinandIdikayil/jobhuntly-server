import { SectorEntity } from "../../../../../domain/entities"
import { sectorModel } from "../../model/sectorModel"


export const listSector = async (): Promise<SectorEntity[] | null> => {
    try {
        let sectors = await sectorModel.find({isDeleted:false});
        if(sectors.length > 0){
            return sectors as SectorEntity[]
        } else {
            return []
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}