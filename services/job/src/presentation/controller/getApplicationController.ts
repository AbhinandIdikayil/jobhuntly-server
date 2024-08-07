import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"

export const getApplicationController = (dependencies: IDependencies) => {
    const { usecases: { getApplicationUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { _id } = req.user
            let data;
            console.log(req.user,'000000000000000')
            if (_id) {
                data = await getApplicationUsecase(dependencies).execute(_id)
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