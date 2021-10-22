import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

export async function ensureAdmin(request: Request, response: Response, nextFunction: NextFunction) {
    const userRepository = getCustomRepository(UserRepository);

    const { user_id } = request;

    const { admin } = await userRepository.findOne(user_id);

    if (admin) {
        return nextFunction();
    }
    return response.status(401).json({
        error: "Unauthorized"
    });
}