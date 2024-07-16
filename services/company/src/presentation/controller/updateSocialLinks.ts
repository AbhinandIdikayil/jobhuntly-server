import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ModifiedRequest } from "../../utils/verifyToken";



export const updateSocialLinksController = (dependencies: IDependencies) => {
    const { usecases: { updateSocialLinksUsecase } } = dependencies
    return async (req: ModifiedRequest, res: Response, next: NextFunction) => {
        try {
            const { _id, role, email } = req.user || {}
            const {data} = req.body
            console.log(data,email)
            let values ={ 
                socialLinks:[
                    data?.twitter,
                    data?.youtube,
                    data?.facebook,
                    data?.instagram
                ],
                LinkedInLink:data.LinkedInLink
            }
            const result = await updateSocialLinksUsecase(dependencies).execute(values,email);
            if(values) {
                return res.status(200).json(result)
            } else {
                return res.status(400).json('something has happened')
            }
        } catch (error) {
            next(error)
        }
    }
}