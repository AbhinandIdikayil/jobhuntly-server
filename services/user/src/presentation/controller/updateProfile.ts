import { NextFunction, Request, Response } from "express"
import { IDependencies } from "../../application/interfaces/IDependencies"
import { ModifiedRequest } from "../../utils/verifyToken"
import axios from 'axios'

export const updateProfileController = (dependencies: IDependencies) => {
    const { usecases: { updateProfileUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { email } = req.user || {}
            if (!req.body) {
                return res.status(400).json('Request body is empty');
            }

            let data
            let result
            if (req.body.twitter || req.body.instagram || req.body.linkedin || req.body.personalwebsite) {
                data = {
                    socialLink: [
                        req.body?.instagram || '',
                        req.body?.twitter || '',
                        req.body?.linkedin || '',
                    ],
                    email,
                    personalsite:req?.body?.personalsite || '',
                }
                result = await updateProfileUsecase(dependencies).execute(data);
            } else {
                data = {
                    ...req.body,
                    email
                }
                result = await updateProfileUsecase(dependencies).execute(data);
            }
            if (result) {
                axios.post(`${process.env.JOB_SERVICE_URL}/add-user`,result)
                return res.status(200).json(result);
            } else {
                return res.status(404).json('Error while updating')
            }

        } catch (error) {
            next(error)
        }
    }
}