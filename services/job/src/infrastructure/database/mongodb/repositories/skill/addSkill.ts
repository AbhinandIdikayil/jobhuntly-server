import { SkillEntity } from "../../../../../domain/entities/SkillEntity";
import { SkillModel } from "../../model/skillsModel";

export const addSkill = async (data:SkillEntity): Promise<SkillEntity | null> => {
    try {
        if(data){
            const skill = await SkillModel.create(data)
            return skill ? skill as SkillEntity : null
        } else {
            return null
        }
    } catch (error:any) {
        throw new Error(error?.message)
    }
}