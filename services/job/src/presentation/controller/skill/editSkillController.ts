import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"

export const editSkillController = (dependencies: IDependencies) => {
    const { usecases: { editSkillUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { data } = req.body
            if (!data) {
                return res.status(404).json('Input is missing')
            }
            let result = await editSkillUsecase(dependencies).execute(data)
            if(result){
                return res.status(200).json(result)
            } else {
                return res.status(404).json('Error while updating skill')
            }
        } catch (error) {
            next(error)
        }
    }
}