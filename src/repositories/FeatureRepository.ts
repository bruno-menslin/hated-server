import { EntityRepository, Repository } from "typeorm";
import { Feature } from "../entities/Feature";

@EntityRepository(Feature)
class FeatureRepository extends Repository<Feature> {}

export { FeatureRepository };