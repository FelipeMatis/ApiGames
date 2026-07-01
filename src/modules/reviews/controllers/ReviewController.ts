import { Request, Response, NextFunction } from "express";
import CreateReviewService from "../services/CreateReviewService";
import ListReviewsService from "../services/ListReviewsService";
import ShowReviewService from "../services/ShowReviewService";
import UpdateReviewService from "../services/UpdateReviewService";
import DeleteReviewService from "../services/DeleteReviewService";

export default class ReviewController {

    public async index(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { game_id } = request.params as { game_id: string };

            const listReviews = new ListReviewsService();
            const reviews = await listReviews.execute({ game_id });

            return response.status(200).json(reviews);
        } catch (err) {
            next(err);
        }
    }

    public async show(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id } = request.params as { id: string };

            const showReview = new ShowReviewService();
            const review = await showReview.execute({ id });

            return response.status(200).json(review);
        } catch (err) {
            next(err);
        }
    }

    public async create(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id: user_id } = request.user;
            const { game_id } = request.params as { game_id: string };
            const { titulo, descricao, nota, plataforma_jogada, horas_jogadas, recomenda } = request.body;

            const createReview = new CreateReviewService();
            const review = await createReview.execute({
                titulo,
                descricao,
                nota,
                plataforma_jogada,
                horas_jogadas,
                recomenda,
                game_id,
                user_id,
            });

            return response.status(201).json(review);
        } catch (err) {
            next(err);
        }
    }

    public async update(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id: user_id } = request.user;
            const { id } = request.params as { id: string };
            const updateData = request.body;

            const updateReview = new UpdateReviewService();
            const review = await updateReview.execute({ id, user_id, ...updateData });

            return response.status(200).json(review);
        } catch (err) {
            next(err);
        }
    }

    public async delete(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id: user_id } = request.user;
            const { id } = request.params as { id: string };

            const deleteReview = new DeleteReviewService();
            await deleteReview.execute({ id, user_id });

            return response.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}
