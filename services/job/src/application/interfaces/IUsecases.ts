import { IListCategory , IAddCategoryUsecase, IDeleteCategoryUsecase, IUpdateCategoryUsecase, 
    IAddSectorUsecase ,listSectorUsecase, IPostJobUsecase, IAddCompanyUsecase, IAddUserUsecase, 
    IGetAlljobs,
    IApplyForJobUsecase,
    IJobDetailsUsecase,
    IRemoveJobUsecase,
    IEditJobUsecase,
    IGetAppilcationUsecase,
    IGetAppilcantsUsecase,
    IGetSpecificApplicantUsecase,
    IUpdateApplicationUsecase,
    IScheduleInterviewUsecase,
    IEditInterviewUsecase,
    IaddSkillUsecase,
    IEditSkillUsecae,
    IListSkillUsecae,
    } from "../../domain/usecaseInterface";
import { IDependencies } from "./IDependencies";



export interface IUsecases {
    addCategoryUsecase:(dependencies:IDependencies) => IAddCategoryUsecase
    listCategoryUsecase:(dependencies:IDependencies) => IListCategory
    deleteCategoryUsecase:(dependencies:IDependencies) => IDeleteCategoryUsecase
    updateCategoryUsecase:(dependencies:IDependencies) => IUpdateCategoryUsecase
    addSectorUsecase:(dependencies:IDependencies) => IAddSectorUsecase
    listSectorUsecase:(dependencies:IDependencies) => listSectorUsecase
    postJobUsecase:(dependencies:IDependencies) => IPostJobUsecase
    addCompanyUsecase:(dependencies:IDependencies) => IAddCompanyUsecase
    addUserUsecase:(depependencies:IDependencies) => IAddUserUsecase
    getAllJobsUsecase:(dependencies:IDependencies) => IGetAlljobs
    applyForJobUsecase:(dependencies:IDependencies) => IApplyForJobUsecase
    jobDetailsUsecae:(dependencies:IDependencies) => IJobDetailsUsecase
    removeJobUsecase:(dependencies:IDependencies) => IRemoveJobUsecase
    editJobUsecase:(dependencies:IDependencies) => IEditJobUsecase
    getApplicationUsecase:(dependencies:IDependencies) => IGetAppilcationUsecase
    getApplicantsUsecase:(dependencies:IDependencies) => IGetAppilcantsUsecase
    getSpecificApplicantUsecase:(dependencies:IDependencies) => IGetSpecificApplicantUsecase
    updateApplicationStatusUsecase:(dependencies:IDependencies) => IUpdateApplicationUsecase
    scheduleInterviewUsecase:(dependencies:IDependencies) => IScheduleInterviewUsecase
    editInterviewUsecase:(dependencies:IDependencies) => IEditInterviewUsecase
    addSkillUsecase:(dependencies:IDependencies) => IaddSkillUsecase
    editSkillUsecase:(dependencies:IDependencies) => IEditSkillUsecae
    listSkillsUsecase:(dependencies:IDependencies) => IListSkillUsecae
}