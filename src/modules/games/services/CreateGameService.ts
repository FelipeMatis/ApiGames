import { AppDataSource } from "@shared/typeorm/data-source";
import Game from "../typeorm/entities/Game";
import AppError from "@shared/errors/AppError";

interface IRequest {
    nome: string;
    genero: string;
    plataforma: string;
    data_lancamento: Date;
    classificacao_indicativa: string;
    desenvolvedora: string;
}

export default class CreateGameService {
    public async execute({
        nome,
        genero,
        plataforma,
        data_lancamento,
        classificacao_indicativa,
        desenvolvedora
    }: IRequest): Promise<Game> {

        const gameRepository = AppDataSource.getRepository(Game);

        const gameExists = await gameRepository.findOne({
            where: { nome }
        });

        if (gameExists) {
            throw new AppError("Já existe um jogo com esse nome");
        }

        if (!nome || !genero || !plataforma) {
            throw new AppError("Campos obrigatórios não preenchidos");
        }

        const game = gameRepository.create({
            nome,
            genero,
            plataforma,
            data_lancamento,
            classificacao_indicativa,
            desenvolvedora
        });

        await gameRepository.save(game);

        return game;
    }
}