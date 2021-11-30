import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

interface IjwtPayload {
    user_id: string
}

export async function ensureAuthenticated(request: Request, response: Response, nextFunction: NextFunction) {
    const userRepository = getCustomRepository(UserRepository);

    const token = request.headers.authorization;

    if (!token) {
        return response.status(401).end();
    }

    try {
        const { user_id } = verify(token, "19uudasç139sdaopsjdhahso8y12983y") as IjwtPayload;

        const user = await userRepository.findOne(user_id);

        if (!user) {
            return response.status(401).end();
        }

        request.user_id = user.id;
        request.user_admin = user.admin;
    } catch (error) {
        return response.status(401).end();
    }

    return nextFunction();
}