import { AppDataSource } from "@shared/typeorm/data-source";
import Game from "../typeorm/entities/Game";

export default class ListGamesService {
    public async execute(): Promise<Game[]> {
        const gameRepository = AppDataSource.getRepository(Game);

        const games = await gameRepository.find();

        return games;
    }
}