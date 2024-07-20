import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";


export const updateCompnayRequestController = (dependencies: IDependencies) => {
    const { usecases: { updateRequestUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email } = req.body;
            if (email) {
                const data = await updateRequestUsecase(dependencies).execute(email)
                if (data) {
                    req.app.get('io').emit('request_update',data)
                    return res.status(200).json(data)
                } else {
                    return res.status(400).json('something happened')
                }
            } else {
                throw new Error('Provide email')
            }
        } catch (error) {
            next(error)
        }
    }
}