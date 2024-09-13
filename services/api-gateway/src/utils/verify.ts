
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken'

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
                    return res.status(401).json({ message: "Failed to authenticate token" });
                }
                if (decoded) {
                    next();
                } else {
                    return res.status(401).json({ error: "Invalid token payload" });
                }
            }
        );
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
};