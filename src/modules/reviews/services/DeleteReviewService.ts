import { AppDataSource } from "@shared/typeorm/data-source";
import Review from "../typeorm/entities/Review";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    user_id: string;
}

export default class DeleteReviewService {
    public async execute({ id, user_id }: IRequest): Promise<void> {
        const reviewRepository = AppDataSource.getRepository(Review);

        const review = await reviewRepository.findOneBy({ id });

        if (!review) {
            throw new AppError('Review não encontrada');
        }

        if (review.user_id !== user_id) {
            throw new AppError('Você não tem permissão para excluir esta review', 403);
        }

        await reviewRepository.remove(review);
    }
}
