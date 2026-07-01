import Game from "../typeorm/entities/Game";
import AppError from "@shared/errors/AppError";
import { AppDataSource } from "@shared/typeorm/data-source";

interface IRequest {
    id: string;
}

export default class ShowGameService {
    public async execute({ id }: IRequest): Promise<Game> {
        const gameRepository = AppDataSource.getRepository(Game);

        const game = await gameRepository.findOneBy({ id });

        if (!game) {
            throw new AppError('Jogo não encontrado');
        }

        return game;
    }
}