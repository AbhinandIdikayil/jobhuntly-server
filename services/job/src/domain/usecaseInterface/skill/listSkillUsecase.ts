import { SkillEntity } from "../../entities/SkillEntity";

export interface IListSkillUsecae {
    execute(): Promise<SkillEntity[] | null>
}
