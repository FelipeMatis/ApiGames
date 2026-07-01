import { AppDataSource } from "@shared/typeorm/data-source";
import Review from "../typeorm/entities/Review";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowReviewService {
    public async execute({ id }: IRequest): Promise<Review> {
        const reviewRepository = AppDataSource.getRepository(Review);

        const review = await reviewRepository.findOneBy({ id });

        if (!review) {
            throw new AppError('Review não encontrada');
        }

        return review;
    }
}
