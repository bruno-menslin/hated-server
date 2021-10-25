import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async create(request: Request, response: Response) {
        
        const {username, email, password, admin} = request.body;

        const userService = new UserService();

        const user = await userService.create({username, email, password, admin});

        return response.json(user);
    }

    async find(request: Request, response: Response) {

        const userService = new UserService();

        const users = await userService.find();

        return response.json(users);
    }

    async findOne(request: Request, response: Response) {

        const userService = new UserService();

        const user = await userService.findOne(request.params.id);

        return response.json(user);
    }
}

export { UserController };