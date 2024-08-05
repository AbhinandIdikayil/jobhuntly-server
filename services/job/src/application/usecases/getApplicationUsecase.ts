import { IDependencies } from "../interfaces/IDependencies"

export const getApplicationUsecase = (dependencies: IDependencies) => {
    const { repositories: { getApplications } } = dependencies
    return {
        execute:async (userid: string) => {
            try {
                return await getApplications(userid)
            } catch (error) {
                throw error
            }
        }
    }
}