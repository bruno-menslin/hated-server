import { Request, Response } from "express";
import { AuthenticationService } from "../services/AuthenticationService";

class AuthenticationController {
    async login(request: Request, response: Response) {
        
        const {email, password} = request.body;

        const authenticationService = new AuthenticationService();

        const token = await authenticationService.login({email, password});

        return response.json(token);
    }
}

export { AuthenticationController };