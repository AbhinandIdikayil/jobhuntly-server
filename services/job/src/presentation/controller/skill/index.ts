import { IDependencies } from "../../../application/interfaces/IDependencies"
import { addSkillController } from "./addSkillController"
import { editSkillController } from "./editSkillController"


export const SkillController = (dependencies: IDependencies) => {
    return {
        addSkill: addSkillController(dependencies),
        editSkill: editSkillController(dependencies)
    }
}