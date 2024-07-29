import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { ModifiedRequest } from "../../utils/verifyToken";
import axios from 'axios'

export const updateProfileController = (dependencies:IDependencies) => {
    const {usecases:{updateProfileUsecase}} = dependencies
    return async (req:ModifiedRequest , res:Response , next:NextFunction) => {
        try {
            const {_id, role , email} = req.user || {}
            const {data} = req.body
            console.log(req.body)
            if(!data || !email){
                throw new Error('provide email and data')
            }
            const result = await updateProfileUsecase(dependencies).execute(data,email)
            if(result) {
                console.log(result)
                await axios.post(`${process.env.JOB_SERVICE_URL}/add-company`,result)
                return res.status(200).json(result)
            } else {
                return res.status(400).json('something has happened')
            }
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
}