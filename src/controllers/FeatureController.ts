import { Request, Response } from "express";
import { FeatureService } from "../services/FeatureService";

class FeatureController {
    async create(request: Request, response: Response) {
        
        const {name} = request.body;

        const featureService = new FeatureService();

        const feature = await featureService.create({name});

        return response.json(feature);
    }
}

export { FeatureController };