import { SkillEntity } from "../../../../../domain/entities/SkillEntity";
import { SkillModel } from "../../model/skillsModel";



export const listSkills = async (): Promise<SkillEntity[] | null> => {
    try {
        const skills = await SkillModel.find()
        if(skills.length > 0){
            return skills as unknown as SkillEntity[]
        } else {
            return []
        }
    } catch (error:any) {
        throw new Error(error?.message)
    }
}   