import { AppDataSource } from "@shared/typeorm/data-source";
import Review from "../typeorm/entities/Review";
import Game from "@modules/games/typeorm/entities/Game";
import AppError from "@shared/errors/AppError";

interface IRequest {
    game_id: string;
}

export default class ListReviewsService {
    public async execute({ game_id }: IRequest): Promise<Review[]> {
        const reviewRepository = AppDataSource.getRepository(Review);
        const gameRepository = AppDataSource.getRepository(Game);

        const game = await gameRepository.findOneBy({ id: game_id });

        if (!game) {
            throw new AppError('Jogo não encontrado');
        }

        const reviews = await reviewRepository.find({
            where: { game_id },
        });

        return reviews;
    }
}
