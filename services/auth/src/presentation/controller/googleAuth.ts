import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { OAuth2Client } from 'google-auth-library'
import { generateRefreshToken, generateToken } from "../../utils/jwt/generateToken";
import { producerService } from "../../config/rabbitmq";
import { maxAge, refreshTokenMaxage } from "../../config/config";


const googleClient = new OAuth2Client({
    clientId: `${process.env.CLIENT_ID_GOOGLE}`
})

export const googleAuthContoller = (dependencies: IDependencies) => {
    const { usecases: { googleAuthUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { token, role, page } = req.body
            console.log(req.body)
            const ticket = await googleClient.verifyIdToken({
                idToken: token,
                audience: `${process.env.CLIENT_ID_GOOGLE}`
            })
            const payload = ticket.getPayload();
            if (payload) {
                if (payload.name && payload.email) {
                    const result = await googleAuthUsecase(dependencies).execute(payload?.email, payload?.name, role, page);
                    const token = generateToken({
                        _id: String(result?._id),
                        email: result?.email!,
                        role: result?.role!
                    },)
                    const refresh_token = generateRefreshToken({
                        _id: String(result?._id),
                        email: result?.email!,
                        role: result?.role!
                    })
                    console.log(result)
                    const response = {
                        name: result?.name,
                        email: result?.email,
                        role: result?.role
                    }

                    //! SENDING USER DATA TO QUEUE BASED ON THE ROLE
                    await producerService.publishToUserQueue(result)

                    return res.status(200)
                        .cookie('access_token', token, { maxAge: maxAge?.maxAge })
                        .cookie('refresh_token', refresh_token, { httpOnly: true, maxAge: refreshTokenMaxage?.maxAge })
                        .json(response)

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