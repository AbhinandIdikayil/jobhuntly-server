import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";


export const router = (dependencies: IDependencies) => {
    const router = Router()
    const { addCategory } = controller(dependencies)



    //! ROUTE FOR ADMIN
    router.route('/add-category').post(addCategory)

    return router
}