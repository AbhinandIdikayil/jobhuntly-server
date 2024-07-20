

export interface IUpdateRequestUsecase {
    execute(email: string): Promise<{email: string} | null>
}