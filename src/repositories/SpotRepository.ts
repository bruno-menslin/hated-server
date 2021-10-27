import { EntityRepository, Repository } from "typeorm";
import { Spot } from "../entities/Spot";

@EntityRepository(Spot)
class SpotRepository extends Repository<Spot> {}

export { SpotRepository };