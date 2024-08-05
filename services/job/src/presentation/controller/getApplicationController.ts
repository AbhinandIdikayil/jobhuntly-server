import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const getApplicationController = (dependencies: IDependencies) => {
    const { usecases: { getApplicationUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userid } = req.params
            let data;
            if (userid) {
                data = await getApplicationUsecase(dependencies).execute(userid)
            } 
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('no data found')
            }
        } catch (error) {
            next(error)
        }
    }
}