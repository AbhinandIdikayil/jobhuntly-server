import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../../application/interfaces/IDependencies"

export const addSkillController = (dependencies: IDependencies) => {
    const { usecases: { addSkillUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {data} = req.body
            if(data){
                let result = await addSkillUsecase(dependencies).execute(data)
                if(result){
                    return res.status(200).json(result)
                } else {
                    return res.status(404).json('Error while adding skill')
                }
            } else {
                return res.status(404).json('Data not found')
            }
        } catch (error) {
            next(error)
        }
    }
}