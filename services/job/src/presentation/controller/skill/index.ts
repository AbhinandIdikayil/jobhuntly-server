import { IDependencies } from "../../../application/interfaces/IDependencies"
import { addSkillController } from "./addSkillController"
import { editSkillController } from "./editSkillController"
import { listSkillController } from "./listSkillController"


export const SkillController = (dependencies: IDependencies) => {
    return {
        addSkill: addSkillController(dependencies),
        editSkill: editSkillController(dependencies),
        listSkill: listSkillController(dependencies)
    }
}