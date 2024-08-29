import { SkillEntity } from "../../entities/SkillEntity";

export interface IEditSkillUsecae {
    execute(data:SkillEntity): Promise<SkillEntity | null>
}