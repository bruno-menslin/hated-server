import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSpots1634686883115 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "spots",
                columns: [
                    {
                        name: "code",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "latitude",
                        type: "number",
                        isNullable: false
                    },
                    {
                        name: "longitude",
                        type: "number",
                        isNullable: false
                    },
                    {
                        name: "image",
                        type: "text",
                        isNullable: false
                    },
                    {
                        name: "address",
                        type: "varchar"
                    },
                    {
                        name: "users_id",
                        type: "uuid"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "users_id",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["users_id"],
                        onDelete: "CASCADE"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("spots");
    }

}
