import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateReviews1777243055065 implements MigrationInterface {
    name = 'CreateReviews1777243055065'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "reviews" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "titulo" character varying NOT NULL,
                "descricao" text NOT NULL,
                "nota" decimal(3,1) NOT NULL,
                "plataforma_jogada" character varying NOT NULL,
                "horas_jogadas" integer,
                "recomenda" boolean NOT NULL DEFAULT false,
                "game_id" uuid NOT NULL,
                "user_id" uuid NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_reviews" PRIMARY KEY ("id"),
                CONSTRAINT "FK_reviews_game" FOREIGN KEY ("game_id") REFERENCES "games"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_reviews_user" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "reviews"`);
    }
}
