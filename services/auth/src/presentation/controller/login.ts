import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { loginValidator } from "../../utils/validator/loginValidator";
import { generateRefreshToken, generateToken } from "../../utils/jwt/generateToken";
import { maxAge, refreshTokenMaxage } from "../../config/config";
import ErrorResponse from "../../utils/common/errorResponse";


export const loginContoller = (dependencies: IDependencies) => {
    const { usecases: { loginUsecase } } = dependencies
    return async (req: Request, res: Response, next: NextFunction) => {
        console.log('h)))))))))))))))))))))))))))')
        try {
            const { value, error } = loginValidator.validate(req.body)
            if (error) {
                throw ErrorResponse.badRequest(error?.message || 'Invalid request data');
            }
            const { email, password } = value
            const result = await loginUsecase(dependencies).execute(email, password);
            if (result) {
                const token = generateToken({ _id: String(result?._id), email: result?.email, role: result?.role ?? '' })
                const refreshToken = generateRefreshToken({ _id: String(result?._id), email: result?.email, role: result?.role ?? '' })
                return res.status(200)
                    .cookie('access_token', token, {httpOnly: true, sameSite:'none', secure:true , maxAge: maxAge?.maxAge})
                    .cookie('refresh_token', refreshToken, { httpOnly: true, sameSite:'none', secure:true , maxAge: refreshTokenMaxage?.maxAge })
                    .json(result)

            } else {
                throw ErrorResponse.badRequest('Login failed, please try again') 
            }
        } catch (error) {
            next(error)
        }
    }
}