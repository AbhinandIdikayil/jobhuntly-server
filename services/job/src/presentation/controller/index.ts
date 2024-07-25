import { IDependencies } from "../../application/interfaces/IDependencies"
import { addCategoryController } from "./addCategory"



export const controller = (dependencies:IDependencies) => {
    return {
        addCategory:addCategoryController(dependencies)
    }
}