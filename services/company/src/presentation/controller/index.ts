import { IDependencies } from "../../application/interfaces/IDependencies"
import { getCompanyController } from "./getCompanyController"
import { updateProfileController } from "./updateProfile"
import { updateSocialLinksController } from "./updateSocialLinks"


export const controller = (dependencies:IDependencies) => {
    return {
        getCompany:getCompanyController(dependencies),
        updateProfile:updateProfileController(dependencies),
        updateSocialLinks:updateSocialLinksController(dependencies)
    }
}