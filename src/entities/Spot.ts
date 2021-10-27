import {Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn} from "typeorm";
import {v4 as uuid} from "uuid";
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
    
    @Column()
    users_id: string

    @JoinColumn({ name: "users_id" })
    @ManyToOne(() => User)
    User: User

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