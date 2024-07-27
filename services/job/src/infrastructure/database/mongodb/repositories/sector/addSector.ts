import { secureHeapUsed } from "crypto";
import { CompanyEntity, SectorEntity } from "../../../../../domain/entities"
import { sectorModel } from "../../model/sectorModel"


export const addSector = async (data: CompanyEntity): Promise<SectorEntity | null> => {
    try {
        if(data){
            let sector = await sectorModel.create(data);
            if(data){
                return sector as SectorEntity
            } else {
                throw new Error('Error while creating sector')
            }
        } else {
            throw new Error('input is empty')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}