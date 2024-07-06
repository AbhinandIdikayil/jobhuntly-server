import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { OAuth2Client } from 'google-auth-library'
import { generateToken } from "../../utils/jwt/generateToken";


const googleClient = new OAuth2Client({
    clientId: `${process.env.CLIENT_ID_GOOGLE}`
})

export const googleAuthContoller = (dependencies: IDependencies) => {
    const { usecases: { googleAuthUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token } = req.body
            const ticket = await googleClient.verifyIdToken({
                idToken: token,
                audience: `${process.env.CLIENT_ID_GOOGLE}`
            })
            const payload = ticket.getPayload();
            if (payload) {
                if (payload.name && payload.email) {
                    const result = await googleAuthUsecase(dependencies).execute(payload?.email, payload?.name)
                    const token = generateToken({
                        _id: String(result?._id),
                        email: result?.email!,
                        role: result?.email!
                    },)

                    const response = {
                        name:result?.name,
                        email:result?.email,
                        role:result?.role
                    }

                    return res.status(200).cookie('accesss_token',token,{
                        httpOnly: true
                    }).json(result)

                    // return res.status(200);
                } else {
                    throw new Error('error in name and email of payload')
                }
            } else {
                throw new Error('error in payload')
            }
        } catch (error: any | Error) {
            console.log(error)
            next(error)
            throw new Error(error)
        }
    }
}