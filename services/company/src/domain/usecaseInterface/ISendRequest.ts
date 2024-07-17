


export interface ISendRequest {
    execute(id:string,email:string): Promise<boolean | null>
}