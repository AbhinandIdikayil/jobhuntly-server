import { NextFunction, Request, Response } from "express"
import { ModifiedRequest } from "../../utils/common/jwtMiddleware"
import { generateToken } from "../../utils/jwt/generateToken"
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'
import { maxAge } from "../../config/config"

export const RefreshTokenController = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('---------------------- refresh token ------------')
            const { refresh_token } = req.cookies
            console.log(req.cookies,refresh_token)
            if (refresh_token) {
                jwt.verify(refresh_token, String(process.env.REFRESH_TOKEN_SECRET), (err: VerifyErrors | null, decoded: JwtPayload | string | undefined) => {
                    if (err) {
                        return res.status(401).json({ message: "Failed to authenticate token" });
                    }
                    if (typeof decoded === 'object' && decoded !== null) {
                        const { _id, email, role } = decoded as { _id: string, email: string, role: string };
                        const token = generateToken({ _id, email, role });
                        console.log('sucess -----------------------')
                        return res.status(200).cookie('access_token',token,{ maxAge: maxAge?.maxAge}).json({message:'success'});
                    } else {
                        return res.status(401).json('Unauthorized');
                    }
                });
            } else {
                return res.status(401).json('Unauthorized')
            }
        } catch (error) {
            next(error)
        }
    }
}