import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"
import axios from 'axios'

export const updateProfileController = (dependencies: IDependencies) => {
    const { usecases: { updateProfileUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const {email} = req.user || {}
            if (req.body) {
                let data = {
                    ...req.body,
                    email
                }
                let result = await updateProfileUsecase(dependencies).execute(data);
                if (result) {
                    axios.post(`${process.env.JOB_SERVICE_URL}/add-user`,result)
                    return res.status(200).json(result);
                } else {
                    return res.status(404).json('Error while updating')
                }
            } else {
                return res.status(404).json('req body is empty')
            }
        } catch (error) {
            next(error)
        }
    }
}