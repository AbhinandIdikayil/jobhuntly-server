import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"


export const searchCompaniesController = (dependencies: IDependencies) => {
    const { usecases: { searchCompaniesUsecae } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const name = req.query?.name as string
            if(name) {
                const data = await searchCompaniesUsecae(dependencies).execute(name)
                if(data) {
                    return res.status(200).json(data)
                } else {
                    return res.status(404).json('no results found')
                }
            } else {
                return res.status(404).json({message:'please provide input'})
            }
        } catch (error) {
            next(error)
        }
    }
}