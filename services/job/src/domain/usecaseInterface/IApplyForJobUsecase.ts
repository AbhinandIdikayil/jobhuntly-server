

export interface IApplyForJobUsecase {
    execute(userid:string,jobid: string , resume: string, companyId: string): Promise<boolean | null>
}