import { SectorEntity } from "../../../domain/entities"
import { IDependencies } from "../../interfaces/IDependencies"


export const addSectorUsecase = (dependencies:IDependencies) => {
    const {repositories:{addSector}} = dependencies
    return {
        execute: async (data:SectorEntity) => {
            try {
                return await addSector(data)
            } catch (error) {
                throw error
            }
        }
    }
}