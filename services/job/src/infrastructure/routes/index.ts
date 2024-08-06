import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import { verifyToken } from "../../utils/verifyToken";


export const router = (dependencies: IDependencies) => {
    const router = Router()
    const { addCategory, listCategory, deleteCategory, updateCategory,
        sector, postjob, addCompany, addUser, getAllJobs, applyForJob
        , getJobDetails, removeJob, editJob, getApplication, getApplicants
        , getSpecificApplicant } = controller(dependencies)


    router.route('/add-company').post(addCompany)
    router.route('/add-user').post(addUser)

    //! ROUTE FOR USER AND COMPANY
    //! IN THIS ROUTE I MIGHT PASS COMPANY ID ALSO TO GET THE JOB 
    //! THAT ARE POST BY SOME PARTICULAR COMPANY
    router.route('/all-job').get(getAllJobs)

    //! ROUTE FOR COMPANY
    router.route('/post-job/:id')
        .post(postjob)
        .delete(removeJob)
        .put(editJob)
    router.route('/applicant').get(verifyToken, getApplicants)
    router.route('/applicant/:id').get( getSpecificApplicant)

    //! ROUTE FOR USER
    router.route('/apply-job').post(applyForJob);
    router.route('/details/:id').get(getJobDetails)
    router.route('/application').get(verifyToken, getApplication)



    //! ROUTE FOR ADMIN
    router.route('/add-category').post(addCategory)
    router.route('/category').get(listCategory)
    router.route('/delete-category').put(deleteCategory)
    router.route('/update-category').put(updateCategory)

    router.route('/add-sector').post(sector.addSector)
    router.route('/sector').get(sector.listSector)
    return router
}