

export interface IBlockUserUsecase {
    execute(email: string): Promise<boolean | null>
}