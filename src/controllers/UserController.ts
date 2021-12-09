import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
    async create(request: Request, response: Response) {
        
        const {username, email, password} = request.body;

        const userService = new UserService();

        const user = await userService.create({username, email, password});

        return response.json(user);
    }

    async find(request: Request, response: Response) {

        const userService = new UserService();

        const users = await userService.find();

        return response.json(users);
    }

    async findOne(request: Request, response: Response) {

        const userService = new UserService();

        const user = await userService.findOne(request.user_id);

        return response.json(user);
    }

    async update(request: Request, response: Response) {

        const {username, email, password} = request.body;

        const userService = new UserService();

        const user = await userService.update(
            request.user_id,
            {username, email, password}
        );

        return response.json(user);
    }
}

export { UserController };