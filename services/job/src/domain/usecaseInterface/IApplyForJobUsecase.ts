

export interface IApplyForJobUsecase {
    execute(userid:string,jobid: string , resume: string): Promise<boolean | null>
}