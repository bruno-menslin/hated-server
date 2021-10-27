import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import {v4 as uuid} from "uuid";
import { Feature } from "./Feature";
import { Spot } from "./Spot";

@Entity("spots_has_features")
class SpotHasFeature {

    @PrimaryColumn()
    readonly id: string;

    @Column()
    spots_code: string

    @Column()
    features_id: string

    @JoinColumn({ name: "features_id" })
    @ManyToOne(() => Feature)
    feature: Feature

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}

export { SpotHasFeature };