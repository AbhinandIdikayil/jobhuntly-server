import { SkillEntity } from "../../entities/SkillEntity";

export interface IaddSkillUsecase {
    execute(data:SkillEntity): Promise<SkillEntity | null>
}