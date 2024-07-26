import { IDependencies } from "../../application/interfaces/IDependencies"
import { addCategoryController } from "./addCategory"
import { deleteCategoryController } from "./deleteCategory"
import { listCategoryController } from "./listCategory"



export const controller = (dependencies:IDependencies) => {
    return {
        addCategory:addCategoryController(dependencies),
        listCategory:listCategoryController(dependencies),
        deleteCategory:deleteCategoryController(dependencies)
    }
}