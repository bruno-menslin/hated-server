import { EntityRepository, Repository } from "typeorm";
import { SpotHasFeature } from "../entities/SpotHasFeature";

@EntityRepository(SpotHasFeature)
class SpotHasFeatureRepository extends Repository<SpotHasFeature> {}

export { SpotHasFeatureRepository };