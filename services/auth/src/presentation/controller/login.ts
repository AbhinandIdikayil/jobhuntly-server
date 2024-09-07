import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { loginValidator } from "../../utils/validator/loginValidator";
import { generateRefreshToken, generateToken } from "../../utils/jwt/generateToken";
import { maxAge, refreshTokenMaxage } from "../../config/config";



export const loginContoller = (dependencies: IDependencies) => {
    const { usecases: { loginUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { value, error } = loginValidator.validate(req.body)
            if (error) {
                throw new Error(error?.message)
            }
            const { email, password } = value
            const result = await loginUsecase(dependencies).execute(email, password);
            if (result) {
                const token = generateToken({ _id: String(result?._id), email: result?.email, role: result?.role ?? '' })
                const refreshToken = generateRefreshToken({ _id: String(result?._id), email: result?.email, role: result?.role ?? '' })
                console.log(token, '--------',refreshToken)
                return res.status(200)
                    .cookie('access_token', token, { maxAge: maxAge?.maxAge})
                    .cookie('refresh_token', refreshToken, { httpOnly: true, maxAge: refreshTokenMaxage?.maxAge })
                    .json(result)

            } else {
                return res.status(400).json({ "message": "something happened" })
            }
        } catch (error) {
            next(error)
        }
    }
}