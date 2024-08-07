import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const getSpecificApplicantController = (dependencies: IDependencies) => {
    const { usecases: { getSpecificApplicantUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            if (!id) {
                return res.status(404).json('pleae provide id')
            }
            const data = await getSpecificApplicantUsecase(dependencies).execute(id)
            if (data) {
                return res.status(200).json(data)
            } else {
                return res.status(404).json('no result')
            }
        } catch (error) {
            next(error)
        }
    }

}