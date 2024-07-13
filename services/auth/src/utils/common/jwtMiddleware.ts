import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken'

interface ModifiedRequest extends Request {
    user: any
}


interface CustomJwtPayload extends JwtPayload {
    userId: string;
    // Add other custom properties that might be in your JWT payload
  }

export const verifyToken = (req: ModifiedRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.access_token;
  
    if (!token) {
      return res.status(401).json({ error: "Access denied. No token provided." });
    }
  
    try {
      jwt.verify(
        token, 
        String(process.env.JWT_SECRET), 
        (err:any, decoded:any) => {
          if (err) {
            return res.status(401).json({ message: "Failed to authenticate token" });
          }
          
          if (decoded) {
            const { userId } = decoded as CustomJwtPayload;
            // Attach the userId to the request object for use in subsequent middleware or route handlers
            req.user = { userId };
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
