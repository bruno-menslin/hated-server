import { query } from "express";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpotsHasFeatures1634688234842 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "spots_has_features",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "spots_code",
                        type: "uuid"
                    },
                    {
                        name: "features_id",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "spots_code",
                        referencedTableName: "spots",
                        referencedColumnNames: ["id"],
                        columnNames: ["spots_code"],
                        onDelete: "CASCADE"
                    },
                    {
                        name: "features_id",
                        referencedTableName: "features",
                        referencedColumnNames: ["id"],
                        columnNames: ["features_id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("spots_has_features");
    }

}
