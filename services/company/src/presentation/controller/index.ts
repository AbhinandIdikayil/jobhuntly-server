import { IDependencies } from "../../application/interfaces/IDependencies"
import { getCompanyController } from "./getCompanyController"


export const controller = (dependencies:IDependencies) => {
    return {
        getCompany:getCompanyController(dependencies)
    }
}