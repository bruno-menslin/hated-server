import { Request, Response, NextFunction } from "express";

export function ensureAdmin(request: Request, response: Response, nextFunction: NextFunction) {
    const { user_admin } = request;

    if (user_admin) {
        return nextFunction();
    }

    return response.status(401).end();
}