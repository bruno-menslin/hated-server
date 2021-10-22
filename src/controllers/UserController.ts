import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async create(request: Request, response: Response) {
        
        const {username, email, password, admin} = request.body;

        const userService = new UserService();

        const user = await userService.create({username, email, password, admin});

        return response.json(user);
    }
}

export { UserController };