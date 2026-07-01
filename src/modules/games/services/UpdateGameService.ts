import { AppDataSource } from "@shared/typeorm/data-source";
import Game from "../typeorm/entities/Game";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    nome?: string;
    genero?: string;
    plataforma?: string;
    data_lancamento?: Date;
    classificacao_indicativa?: string;
    desenvolvedora?: string;
}

export default class UpdateGameService {
    public async execute({
        id,
        ...rest
    }: IRequest): Promise<Game> {

        const gameRepository = AppDataSource.getRepository(Game);

        const game = await gameRepository.findOneBy({ id });

        if (!game) {
            throw new AppError("Jogo não encontrado");
        }

        if (rest.nome) {
            const gameExists = await gameRepository.findOne({
                where: { nome: rest.nome }
            });

            if (gameExists && gameExists.id !== game.id) {
                throw new AppError("Já existe um jogo com esse nome");
            }
        }

        Object.assign(game, rest);

        await gameRepository.save(game);

        return game;
    }
}