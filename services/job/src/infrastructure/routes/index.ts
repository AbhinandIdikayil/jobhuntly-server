import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";


export const router = (dependencies: IDependencies) => {
    const router = Router()
    const { addCategory, listCategory, deleteCategory, updateCategory, sector } = controller(dependencies)



    //! ROUTE FOR ADMIN
    router.route('/add-category').post(addCategory)
    router.route('/category').get(listCategory)
    router.route('/delete-category').put(deleteCategory)
    router.route('/update-category').put(updateCategory)


    router.route('/add-sector').post(sector.addSector)
    router.route('/sector').get(sector.listSector)
    return router
}