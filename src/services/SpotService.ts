import { getCustomRepository, ILike } from "typeorm";
import { SpotRepository } from "../repositories/SpotRepository";
import { Feature } from "../entities/Feature";
import { request } from "express";
import { FeatureRepository } from "../repositories/FeatureRepository";
import { classToPlain } from "class-transformer";
import { UserRepository } from "../repositories/UserRepository";

interface Ispot {
    latitude: number
    longitude: number
    image: string
    featuresNames: Array<string>
    address?: string
    user_id: string
}

class SpotService {
    async create({latitude, longitude, image, featuresNames, address = null, user_id} : Ispot) {
        const spotRepository = getCustomRepository(SpotRepository);
        const userRepository = getCustomRepository(UserRepository);
        const featureRepository = getCustomRepository(FeatureRepository);

        const user = await userRepository.findOne(user_id);

        if (!user) {
            throw new Error('user not found');
        }

        const spotAlreadyExists = await spotRepository.findOne({
            where: [
                {latitude: latitude, longitude: longitude}
            ]
        });

        if (spotAlreadyExists) {
            throw new Error('already exists spot in this location');
        }

        //promise
        const pFeatures = featuresNames.map(featureName => {
            return featureRepository.find({
                where: {
                    name: featureName
                }
            })
        })

        const features = await Promise.all(pFeatures);
        
        const filteredFeatures = features.map((feature, i) => {
            if (!feature[0]) {
                throw new Error(`feature "${featuresNames[i]}" not found`)
            }
            return feature[0]
        });

        const spot = spotRepository.create({
            latitude: latitude,
            longitude: longitude,
            image: image,
            address: address,
            user: user,
            features: filteredFeatures
        });

        await spotRepository.save(spot);

        return spot;
    }

    async find() {
        const spotRepository = getCustomRepository(SpotRepository);

        const spots = await spotRepository.find({
            relations: ["features"]
        });

        return classToPlain(spots);
    }

    async findOne(id: string) {
        const spotRepository = getCustomRepository(SpotRepository);

        const spot = await spotRepository.findOne(id, {
            relations: ["features"]
        });

        return classToPlain(spot);
    }
}

export { SpotService };