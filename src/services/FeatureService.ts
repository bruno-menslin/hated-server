import { getCustomRepository } from "typeorm";
import { FeatureRepository } from "../repositories/FeatureRepository";

interface Ifeature {
    name: string
}

class FeatureService {
    async create({name} : Ifeature) {
        const featureRepository = getCustomRepository(FeatureRepository);

        const featureAlreadyExists = await featureRepository.findOne({
            where: [
                {name: name}
            ]
        });

        if (featureAlreadyExists) {
            throw new Error('feature already exists');
        }

        const feature = featureRepository.create({
            name: name
        });

        await featureRepository.save(feature);

        return feature;
    }
}

export { FeatureService };