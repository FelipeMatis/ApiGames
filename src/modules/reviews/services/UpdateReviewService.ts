import { AppDataSource } from "@shared/typeorm/data-source";
import Review from "../typeorm/entities/Review";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
    titulo?: string;
    descricao?: string;
    nota?: number;
    plataforma_jogada?: string;
    horas_jogadas?: number;
    recomenda?: boolean;
}

export default class UpdateReviewService {
    public async execute({ id, user_id, ...rest }: IRequest): Promise<Review> {
        const reviewRepository = AppDataSource.getRepository(Review);

        const review = await reviewRepository.findOneBy({ id });

        if (!review) {
            throw new AppError('Review não encontrada');
        }

        if (review.user_id !== user_id) {
            throw new AppError('Você não tem permissão para editar esta review', 403);
        }

        if (rest.nota !== undefined && (rest.nota < 0 || rest.nota > 10)) {
            throw new AppError('A nota deve ser entre 0 e 10');
        }

        Object.assign(review, rest);

        await reviewRepository.save(review);

        return review;
    }
}
