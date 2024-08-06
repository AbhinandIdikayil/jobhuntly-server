import { ApplicantsEntity, ApplicationEntity, CategoryEntity, CompanyEntity, JobEntity, SectorEntity, UserEntity } from "../../domain/entities";

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
    getAllJobs(): Promise<JobEntity[] | null>
    applyForJob(userid: string,jobid: string, resume: string,companyId: string): Promise<boolean | null>
    jobDetails(id: string): Promise<JobEntity[] | null>
    removeJob(id: string): Promise<JobEntity | null>
    updateExpiredJobs(): Promise<boolean| null>
    editJob(id: string,data:JobEntity): Promise<JobEntity | null>
    getApplications(userid: string): Promise<ApplicationEntity[] | null>
    getApplicants(companyId: string): Promise<ApplicantsEntity[] | null>
    getSpecificApplicant(id: string): Promise<ApplicantsEntity | null>

}