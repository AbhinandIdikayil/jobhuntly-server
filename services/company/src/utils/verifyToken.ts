import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface ModifiedRequest extends Request {
    user?: any
}

interface CustomJwtPayload extends JwtPayload {
    userId: any;
}

export const verifyToken = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req?.cookies?.access_token;
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        jwt.verify(
            token,
            String(process.env.ACCESS_TOKEN_SECRET),
            (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    console.log('Failed to authenticate token')
                    return res.status(401).json({ message: "Failed to authenticate token" });
                }
                
                if (decoded) {
                    console.log(decoded)
                    const { _id , email , role  } = decoded as CustomJwtPayload;
                    (req as ModifiedRequest).user = { _id , email , role };
                    next();
                } else {
                    console.log("Invalid token payload" )
                    return res.status(401).json({ error: "Invalid token payload" });
                }
            }
        );
    } catch (error) {
        console.log("Internal server error")
        return res.status(500).json({ error: "Internal server error" });
    }
};

