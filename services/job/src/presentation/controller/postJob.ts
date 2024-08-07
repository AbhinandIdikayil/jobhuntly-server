import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"



export const postJobController = (dependencies: IDependencies) => {
    const { usecases: { postJobUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body)
            if(req.body){
                const company = await postJobUsecase(dependencies).execute(req.body);
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