import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IjwtPayload {
    user_id: string
}

export function ensureAuthenticated(request: Request, response: Response, nextFunction: NextFunction) {
    const token = request.headers.authorization;

    if (!token) {
        return response.status(401).end();
    }

    try {
        const { user_id } = verify(token, "19uudasç139sdaopsjdhahso8y12983y") as IjwtPayload;
        request.user_id = user_id;
        return nextFunction();
    } catch (error) {
        return response.status(401).end();
    }
}