import { ApplicantsEntity, ApplicationEntity, CategoryEntity, CompanyEntity, filterPagination, getAllJobsEntity, JobEntity, SectorEntity, UserEntity } from "../../domain/entities";
import { SkillEntity } from "../../domain/entities/SkillEntity";

export interface IRepositories {
    addCategory(data: CategoryEntity): Promise<CategoryEntity | null>
    listCategory(): Promise<CategoryEntity[] | null>
    deleteCategory(id: string): Promise<CategoryEntity | null>
    updateCategory(data: CategoryEntity): Promise<CategoryEntity | null>
    addSector(data: SectorEntity): Promise<SectorEntity | null>
    listSector(): Promise<SectorEntity[] | null>
    postJob(data:JobEntity): Promise<JobEntity | null>
    addCompany(data:CompanyEntity): Promise<CompanyEntity | null>
    addUser(data:UserEntity): Promise<UserEntity | null>
    getAllJobs(id?: string,option?:filterPagination): Promise<getAllJobsEntity[] | null>
    applyForJob(userid: string,jobid: string, resume: string,companyId: string): Promise<boolean | null>
    jobDetails(id: string): Promise<JobEntity[] | null>
    removeJob(id: string): Promise<JobEntity | null>
    updateExpiredJobs(): Promise<boolean| null>
    editJob(id: string,data:JobEntity): Promise<JobEntity | null>
    getApplications(userid: string): Promise<ApplicationEntity[] | null>
    getApplicants(companyId: string): Promise<ApplicantsEntity[] | null>
    getSpecificApplicant(id: string): Promise<ApplicantsEntity | null>
    updateApplicationStatus(id: string,hired?:boolean): Promise<ApplicantsEntity | null>
    scheduleInterview(applicantId: string,time:string,date:string,type:string, room:string): Promise<ApplicantsEntity | null>
    editInterview(applicantId: string,data:any, index:number): Promise<ApplicantsEntity | null>
    addSkill(data:SkillEntity): Promise<SkillEntity | null>
    editSkill(data:SkillEntity): Promise<SkillEntity | null>
    listSkills(): Promise<SkillEntity[] | null>
}