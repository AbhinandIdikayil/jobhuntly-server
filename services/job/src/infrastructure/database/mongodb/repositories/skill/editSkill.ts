import { SkillEntity } from "../../../../../domain/entities/SkillEntity"
import { SkillModel } from "../../model/skillsModel"


export const editSkill = async (data: SkillEntity): Promise<SkillEntity | null> => {
    try {
        if (data._id) {
            const exist = await SkillModel.findOne({ name: { $regex: new RegExp(`^${data?.name}$`, 'i') } })
            if(exist){
                throw new Error('Skill exist')
            }
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