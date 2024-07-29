import { IDependencies } from "../../application/interfaces/IDependencies"
import { addCategoryController } from "./addCategory"
import { addCompanyController } from "./addCompany"
import { deleteCategoryController } from "./deleteCategory"
import { listCategoryController } from "./listCategory"
import { postJobController } from "./postJob"
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
    }
}