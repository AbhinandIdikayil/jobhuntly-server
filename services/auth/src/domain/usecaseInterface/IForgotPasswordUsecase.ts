

export interface IForgotPasswordUsecase {
    execute(email: string,password:string): Promise<boolean | null>
}