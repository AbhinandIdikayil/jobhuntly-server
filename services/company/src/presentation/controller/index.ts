import { IDependencies } from "../../application/interfaces/IDependencies"
import { getCompanyController } from "./getCompanyController"
import { listRequestController } from "./listRequest"
import { sendRequestController } from "./sendRequest"
import { updateCompnayRequestController } from "./updateCompanyRequest"
import { updateProfileController } from "./updateProfile"
import { updateSocialLinksController } from "./updateSocialLinks"


export const controller = (dependencies:IDependencies) => {
    return {
        getCompany:getCompanyController(dependencies),
        updateProfile:updateProfileController(dependencies),
        updateSocialLinks:updateSocialLinksController(dependencies),
        sendRequest:sendRequestController(dependencies),
        updateRequest:updateCompnayRequestController(dependencies),
        listRequest:listRequestController(dependencies)
    }
}