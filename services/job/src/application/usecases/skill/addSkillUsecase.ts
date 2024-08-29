import { SkillEntity } from "../../../domain/entities/SkillEntity"
import { IDependencies } from "../../interfaces/IDependencies"


export const addSkillUsecase = (dependencies: IDependencies) => {
    const { repositories: { addSkill } } = dependencies
    return {
        execute: async (data:SkillEntity) => {
            try {
                return await addSkill(data)
            } catch (error) {
                throw error
            }
        }
    }
}