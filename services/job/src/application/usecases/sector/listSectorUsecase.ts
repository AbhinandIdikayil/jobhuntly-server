import { IDependencies } from "../../interfaces/IDependencies"



export const listSectorUsecase = (dependencies: IDependencies) => {
    const { repositories: { listSector } } = dependencies
    return {
        execute: async () => {
            try {
                return await listSector()
            } catch (error) {
                throw error
            }
        }
    }
}