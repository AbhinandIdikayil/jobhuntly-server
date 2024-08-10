import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface ModifiedRequestAdmin extends Request {
    admin?: any
}

interface CustomJwtPayload extends JwtPayload {
    userId: any;
}

export const verifyTokenAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req?.cookies?.access_token;
    console.log(token, req.cookies)
    if (!token) {
        return res.status(401).json({ error: "Access denied. No token provided." });
    }

    try {
        jwt.verify(
            token,
            String(process.env.ACCESS_TOKEN_SECRET),
            async (err: jwt.VerifyErrors | null, decoded: any) => {
                if (err) {
                    console.log(err)
                    return res.status(401).json({ message: "Failed to authenticate token" });
                }

                if (decoded) {
                    console.log(decoded)
                    const { _id, email, role } = decoded as CustomJwtPayload;
                    if (role == 'admin') {
                        (req as ModifiedRequestAdmin).admin = { _id, email, role };
                        next();
                    } else {
                        return res.status(401).json({ error: "Invalid token payload" });
                    }
                } else {
                    return res.status(401).json({ error: "Invalid token payload" });
                }
            }
        );
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};
