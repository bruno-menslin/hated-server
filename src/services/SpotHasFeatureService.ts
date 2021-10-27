import { getCustomRepository } from "typeorm";
import { SpotHasFeatureRepository } from "../repositories/SpotHasFeatureRepository";
import { request } from "express";
import { FeatureRepository } from "../repositories/FeatureRepository";
import { Spot } from "../entities/Spot";
import { SpotHasFeature } from "../entities/SpotHasFeature";


class SpotHasFeatureService {
    async create(spot: Spot, featuresNames: Array<string>) {
        const featureRepository = getCustomRepository(FeatureRepository);
        const spotHasFeatureRepository = getCustomRepository(SpotHasFeatureRepository);
        
        //promise
        const pFeatures = featuresNames.map(async featureName => {
            const feature = await featureRepository.findOne({
                where: {
                    name: featureName
                }
            });

            if (!feature) {
                throw new Error(`feature "${featureName}" not found`)
            }

            return feature;
        })

        const features = await Promise.all(pFeatures);
        
        let spotHasFeatures = [];
        
        features.forEach(feature => {
            spotHasFeatures.push(spotHasFeatureRepository.create({
                spots_code: spot.code,
                features_id: feature.id
            }));
        })

        await spotHasFeatureRepository.save(spotHasFeatures);

        return spotHasFeatures;
    }
}

export { SpotHasFeatureService };