import { Request, Response } from "express";
import { SpotService } from "../services/SpotService";

class SpotController {
    async create(request: Request, response: Response) {
        
        const {latitude, longitude, image, features, address = null} = request.body;
        const {user_id} = request;

        const spotService = new SpotService();

        const spot = await spotService.create({latitude, longitude, image, featuresNames: features, address, user_id});

        return response.json(spot);
    }
}

export { SpotController };