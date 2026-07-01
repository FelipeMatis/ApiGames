import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsers1777243055064 implements MigrationInterface {
    name = 'CreateUsers1777243055064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "nome" character varying NOT NULL,
                "email" character varying NOT NULL,
                "senha" character varying NOT NULL,
                "role" character varying NOT NULL DEFAULT 'user',
                "avatar" character varying,
                "bio" character varying,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
