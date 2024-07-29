import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"



export const postJobController = (dependencies: IDependencies) => {
    const { usecases: { addCompanyUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(req.body){
                const company = await addCompanyUsecase(dependencies).execute(req.body);
                if(company){
                    return res.status(200).json(company)
                } else {
                    return res.status(404).json('company is empty')
                }
            }else {
                return res.status(404).json('body is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}