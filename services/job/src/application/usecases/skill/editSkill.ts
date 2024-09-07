import { SkillEntity } from "../../../domain/entities/SkillEntity"
import { IDependencies } from "../../interfaces/IDependencies"


export const editSkillUsecase = (dependencies: IDependencies) => {
    const { repositories: { editSkill } } = dependencies
    return {
        execute: async (data:SkillEntity) => {
            try {
                return await editSkill(data)
            } catch (error) {
                throw error
            }
        }
    }
}