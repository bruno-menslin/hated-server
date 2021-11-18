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

    async find(request: Request, response: Response) {

        const spotService = new SpotService();

        const spots = await spotService.find();

        return response.json(spots);
    }

    async findOne(request: Request, response: Response) {

        const spotService = new SpotService();

        const spot = await spotService.findOne(request.params.code);

        return response.json(spot);
    }

    async update(request: Request, response: Response) {

        const {latitude, longitude, image, features, address = null} = request.body;

        const spotService = new SpotService();

        const spot = await spotService.update(
            request.params.code,
            {latitude, longitude, image, featuresNames: features, address}
        );

        return response.json(spot);
    }

    async delete(request: Request, response: Response) {

        const spotService = new SpotService();

        const spot = await spotService.delete(request.params.code);

        return response.status(200).end();
    }
}

export { SpotController };