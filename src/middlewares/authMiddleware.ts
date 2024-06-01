import type { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { send } from "../handlers/response";
import { env } from "../utils/env";

const JWT_SECRET_KEY = env("JWT_SECRET_KEY");

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]
    
    if (!token) return send(res).unauthorized('Authorization token not provided')

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) return send(res).forbidden("Invalid token: forbidden access");

        next()
    })
}