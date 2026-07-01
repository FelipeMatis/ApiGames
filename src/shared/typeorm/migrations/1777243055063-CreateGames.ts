import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGames1777243055063 implements MigrationInterface {
    name = 'CreateGames1777243055063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "games" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nome" character varying NOT NULL, "genero" character varying NOT NULL, "plataforma" character varying NOT NULL, "data_lancamento" date NOT NULL, "classificacao_indicativa" character varying NOT NULL, "desenvolvedora" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_c9b16b62917b5595af982d66337" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "games"`);
    }

}
