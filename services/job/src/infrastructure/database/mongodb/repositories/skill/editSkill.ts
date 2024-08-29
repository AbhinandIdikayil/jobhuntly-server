import { SkillEntity } from "../../../../../domain/entities/SkillEntity"
import { SkillModel } from "../../model/skillsModel"


export const editSkill = async (data: SkillEntity): Promise<SkillEntity | null> => {
    try {
        if (data._id) {
            const editedSkill = await SkillModel.findByIdAndUpdate(
                { _id: data?._id },
                { $set: { ...data } },
                { new: true }
            )
            return editedSkill ? editedSkill as unknown as SkillEntity : null
        } else {
            throw new Error('id is missing')
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }
}