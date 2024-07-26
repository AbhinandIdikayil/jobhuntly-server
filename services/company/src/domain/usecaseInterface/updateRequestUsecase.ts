

export interface IUpdateRequestUsecase {
    execute(id: string,status: string): Promise<{email: string,status: string} | null>
}