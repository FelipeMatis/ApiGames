import { DataSource } from "typeorm";
import Game from "../../modules/games/typeorm/entities/Game";
import User from "../../modules/users/typeorm/entities/User";
import Review from "../../modules/reviews/typeorm/entities/Review";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "apigames",
    synchronize: false,
    logging: true,
    entities: [Game, User, Review],
    migrations: [__dirname + "/migrations/*{.ts,.js}"],
});
