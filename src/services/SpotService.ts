import { getCustomRepository } from "typeorm";
import { SpotRepository } from "../repositories/SpotRepository";
import { SpotHasFeatureRepository } from "../repositories/SpotHasFeatureRepository";
import { Feature } from "../entities/Feature";
import { request } from "express";
import { FeatureRepository } from "../repositories/FeatureRepository";
import { SpotHasFeatureService } from "./SpotHasFeatureService";


interface Ispot {
    latitude: number
    longitude: number
    image: string
    features: Array<string>
    address?: string
    user_id: string
}

class SpotService {
    async create({latitude, longitude, image, features, address = null, user_id} : Ispot) {
        const spotRepository = getCustomRepository(SpotRepository);
        const spotHasFeatureService = new SpotHasFeatureService();

        const spotAlreadyExists = await spotRepository.findOne({
            where: [
                {latitude: latitude, longitude: longitude}
            ]
        });

        if (spotAlreadyExists) {
            throw new Error('already exists spot in this location');
        }

        const spot = spotRepository.create({
            latitude: latitude,
            longitude: longitude,
            image: image,
            address: address,
            users_id: user_id
        });

        await spotRepository.save(spot);
        
        try {
            await spotHasFeatureService.create(spot, features);
        } catch (error) {
            await spotRepository.remove(spot);
            throw new Error(error.message);
        }

        return spot;
    }
}

export { SpotService };