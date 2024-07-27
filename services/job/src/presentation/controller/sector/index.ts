import { IDependencies } from "../../../application/interfaces/IDependencies";
import { addSectorController } from "./addSectorControlle";


export const sectorController = (dependencies:IDependencies) => {
    return {
        addSector:addSectorController(dependencies)
    }
}