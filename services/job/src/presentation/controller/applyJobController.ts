import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const applyJobController = (dependencies: IDependencies) => {
    const { usecases: { applyForJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userid, jobid, resume, companyId } = req.body
            console.log(req.body)
            if (req.body) {
                let result = await applyForJobUsecase(dependencies).execute(userid, jobid, resume,companyId)
                if(result){
                    return res.status(200).json(result)
                } else {
                    return res.status(404).json('cant apply')
                }
            } else {
                return res.status(404).json('req body is empty')
            }
        } catch (error) {
            next(error)
        }
    }

}