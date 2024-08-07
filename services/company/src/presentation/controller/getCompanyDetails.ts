import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"

export const companyDetailsController = (dependencies: IDependencies) => {
    const { usecases: { getCompanyDetailsUsecae } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id} = req.params
            if(id){
                const data = await getCompanyDetailsUsecae(dependencies).execute(id)
                if(data) {
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('failed to get company')
                }
            } else {
                return res.status(404).json('hi')
            }
        } catch (error) {
            next(error)
        }
    }
}