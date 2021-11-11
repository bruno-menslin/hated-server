import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, ManyToMany, JoinTable} from "typeorm";
import {v4 as uuid} from "uuid";
import { Feature } from "./Feature";
import { User } from "./User";

@Entity("spots")
class Spot {

    @PrimaryColumn()
    readonly code: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    image: string

    @Column()
    address: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: "users_id" })
    user: User

    @ManyToMany(() => Feature)
    @JoinTable({
        name: "spots_has_features",
        joinColumn: {
            name: "spots_code",
            referencedColumnName: "code"
        },
        inverseJoinColumn: {
            name: "features_id",
            referencedColumnName: "id"
        }
    })
    features: Feature[];

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.code) {
            this.code = uuid();
        }
    }
}

export { Spot };