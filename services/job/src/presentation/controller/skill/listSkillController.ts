import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"


export const listSkillController = (dependencies: IDependencies) => {
    const { usecases: { listSkillsUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let data = await listSkillsUsecase(dependencies).execute()
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('Cannot get skills')
            }
        } catch (error) {
            next(error)
        }
    }
}