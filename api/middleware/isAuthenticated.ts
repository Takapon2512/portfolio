import { Request, Response, NextFunction } from "express";
import { JwtPayload, verify, VerifyErrors } from "jsonwebtoken";
import { Unauthorized } from "../utils/StatusCode";

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization?.split(" ")[1];
    console.log(token);

    if (!token) return res.status(Unauthorized).json({ message: "権限がありません。" });

    verify(token, process.env.SECRET_KEY || "", 
    (err: VerifyErrors | null, decoded: string | JwtPayload | undefined) => {
        if (err || decoded === undefined) return res.status(Unauthorized).json({ message: "権限がありません。" });
        if (typeof decoded !== "string") req.body.user_id = decoded.id;

        next();
    });
};