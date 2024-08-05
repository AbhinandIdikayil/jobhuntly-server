import { IDependencies } from "../../application/interfaces/IDependencies"
import { addCategoryController } from "./addCategory"
import { addCompanyController } from "./addCompany"
import { addUserController } from "./addUser"
import { applyJobController } from "./applyJobController"
import { deleteCategoryController } from "./deleteCategory"
import { editJobController } from "./editJobController"
import { getAllJobsController } from "./getAllJobsController"
import { getApplicantController } from "./getApplicantsController"
import { getApplicationController } from "./getApplicationController"
import { jobDetailsController } from "./jobDetailsController"
import { listCategoryController } from "./listCategory"
import { postJobController } from "./postJob"
import { removeJobController } from "./removeJob"
import { sectorController } from "./sector"
import { updateCategoryController } from "./updateCategory"



export const controller = (dependencies: IDependencies) => {
    return {
        addCategory: addCategoryController(dependencies),
        listCategory: listCategoryController(dependencies),
        deleteCategory: deleteCategoryController(dependencies),
        updateCategory: updateCategoryController(dependencies),
        sector:sectorController(dependencies),
        postjob:postJobController(dependencies),
        addCompany:addCompanyController(dependencies),
        addUser:addUserController(dependencies),
        getAllJobs:getAllJobsController(dependencies),
        applyForJob:applyJobController(dependencies),
        getJobDetails:jobDetailsController(dependencies),
        removeJob:removeJobController(dependencies),
        editJob:editJobController(dependencies),
        getApplication:getApplicationController(dependencies),
        getApplicants:getApplicantController(dependencies)
    }
}