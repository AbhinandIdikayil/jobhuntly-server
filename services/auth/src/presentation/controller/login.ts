import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../application/interfaces/IDependencies";
import { loginValidator } from "../../utils/validator/loginValidator";
import { generateToken } from "../../utils/jwt/generateToken";



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
                return res.status(200).cookie('access_token',token).json(result)
            } else {
                return res.status(400).json({ "message": "something happened" })
            }
        } catch (error) {
            next(error)
        }
    }
}