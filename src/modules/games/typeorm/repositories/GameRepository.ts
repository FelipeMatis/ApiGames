import { Repository } from "typeorm";
import Game from "../entities/Game";
import { AppDataSource } from "@shared/typeorm/data-source";

export default class GameRepository {
    private ormRepository: Repository<Game>;

    constructor() {
        this.ormRepository = AppDataSource.getRepository(Game);
    }

    public async findByNome(nome: string): Promise<Game | null> {
        const game = await this.ormRepository.findOne({
            where: { nome }
        });

        return game;
    }
}