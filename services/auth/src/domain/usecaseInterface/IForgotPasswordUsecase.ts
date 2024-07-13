

export interface IForgotPasswordUsecase {
    execute(email: string,password:string): Promise<any | null>
}