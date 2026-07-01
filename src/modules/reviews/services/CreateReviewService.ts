import { AppDataSource } from "@shared/typeorm/data-source";
import Review from "../typeorm/entities/Review";
import Game from "@modules/games/typeorm/entities/Game";
import AppError from "@shared/errors/AppError";

interface IRequest {
    titulo: string;
    descricao: string;
    nota: number;
    plataforma_jogada: string;
    horas_jogadas?: number;
    recomenda: boolean;
    game_id: string;
    user_id: string;
}

export default class CreateReviewService {
    public async execute({
        titulo,
        descricao,
        nota,
        plataforma_jogada,
        horas_jogadas,
        recomenda,
        game_id,
        user_id,
    }: IRequest): Promise<Review> {
        const reviewRepository = AppDataSource.getRepository(Review);
        const gameRepository = AppDataSource.getRepository(Game);

        if (!titulo || !descricao || !plataforma_jogada) {
            throw new AppError('Campos obrigatórios não preenchidos');
        }

        if (nota < 0 || nota > 10) {
            throw new AppError('A nota deve ser entre 0 e 10');
        }

        const game = await gameRepository.findOneBy({ id: game_id });

        if (!game) {
            throw new AppError('Jogo não encontrado');
        }

        const jaAvaliou = await reviewRepository.findOne({
            where: { game_id, user_id }
        });

        if (jaAvaliou) {
            throw new AppError('Você já avaliou esse jogo');
        }

        const review = reviewRepository.create({
            titulo,
            descricao,
            nota,
            plataforma_jogada,
            horas_jogadas,
            recomenda,
            game_id,
            user_id,
        });

        await reviewRepository.save(review);

        return review;
    }
}
