import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"



export const addCompanyController = (dependencies: IDependencies) => {
    const { usecases: { addCompanyUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body,'iiiiiiiiiiiiiiiiii')
            if(req.body){
                let data = await addCompanyUsecase(dependencies).execute(req.body);
                if(data) {
                    return res.status(200).json(data)
                } else {    
                    return res.status(404).json('couldnt create company1')
                }
            } else {
                return res.status(404).json('couldnt create company2')
            }
        } catch (error) {
            next(error)
        }
    }
}