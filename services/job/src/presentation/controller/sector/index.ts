import { IDependencies } from "../../../application/interfaces/IDependencies";
import { addSectorController } from "./addSectorControlle";
import { listSectorController } from "./listSectorController";


export const sectorController = (dependencies:IDependencies) => {
    return {
        addSector:addSectorController(dependencies),
        listSector:listSectorController(dependencies)
    }
}