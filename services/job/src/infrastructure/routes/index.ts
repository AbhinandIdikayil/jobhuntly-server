import { Router } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { controller } from "../../presentation/controller";
import { verifyToken } from "../../utils/verifyToken";
import { recommendJobsController } from "../../presentation/controller/recommendJobs";


export const router = (dependencies: IDependencies) => {
    const router = Router()
    const { addCategory, listCategory, deleteCategory, updateCategory,
        sector, postjob, addCompany, addUser, getAllJobs, applyForJob
        , getJobDetails, removeJob, editJob, getApplication, getApplicants
        , getSpecificApplicant, updateApplicationStatus, interview, skill, download } = controller(dependencies)


    router.route('/add-company').post(addCompany)
    router.route('/add-user').post(addUser)

    //! ROUTE FOR USER AND COMPANY
    //! IN THIS ROUTE I MIGHT PASS COMPANY ID ALSO TO GET THE JOB 
    //! THAT ARE POST BY SOME PARTICULAR COMPANY
    router.route('/all-job/:id?').get(verifyToken, getAllJobs)

    //! ROUTE FOR COMPANY
    router.route('/post-job/:id?')
        .post(postjob)
        .delete(removeJob)
        .put(editJob)
    router.route('/applicant').get(verifyToken, getApplicants)
    router.route('/applicant/:id').get(verifyToken, getSpecificApplicant)
    router.route('/application/:applicationID').put(verifyToken, updateApplicationStatus)

    router.route('/schedule-interview/:applicationID')
        .put(verifyToken, interview.scheduleInterview)
        .patch(verifyToken, interview.editInterview)
    router.route('/download').post(verifyToken,download)




    //! ROUTE FOR USER
    router.route('/jobs').get(getAllJobs)
    router.route('/apply-job').post(verifyToken, applyForJob);
    router.route('/details/:id').get(getJobDetails)
    router.route('/application').get(verifyToken, getApplication)
    router.route('/recommend').get(verifyToken,recommendJobsController())



    //! ROUTE FOR ADMIN
    router.route('/add-category').post(addCategory)
    router.route('/category').get(listCategory)
    router.route('/delete-category').put(deleteCategory)
    router.route('/update-category').put(updateCategory)
    router.route('/skill')
        .post(verifyToken,skill.addSkill)
        .put(verifyToken,skill.editSkill)
        .get(verifyToken,skill.listSkill)
    router.route('/add-sector').post(sector.addSector)
    router.route('/sector').get(sector.listSector)
    return router
}