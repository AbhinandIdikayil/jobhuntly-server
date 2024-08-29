import { IDependencies } from "../../interfaces/IDependencies"

export const listSkillsUsecase = (dependencies: IDependencies) => {
    const { repositories: { listSkills } } = dependencies
    return {
        execute: async () => {
            try {
                return await listSkills()
            } catch (error) {
                throw error
            }
        }
    }
}