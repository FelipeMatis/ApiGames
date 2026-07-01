import { Router } from "express";
import ReviewController from "../controllers/ReviewController";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";

const reviewRouter = Router({ mergeParams: true });
const reviewController = new ReviewController();

// Rotas públicas - qualquer um pode ver reviews
reviewRouter.get('/', async (req, res, next) => {
    try {
        await reviewController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

reviewRouter.get('/:id', async (req, res, next) => {
    try {
        await reviewController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

// Rotas protegidas - apenas usuários autenticados
reviewRouter.post('/', isAuthenticated, async (req, res, next) => {
    try {
        await reviewController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

reviewRouter.put('/:id', isAuthenticated, async (req, res, next) => {
    try {
        await reviewController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

reviewRouter.delete('/:id', isAuthenticated, async (req, res, next) => {
    try {
        await reviewController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default reviewRouter;
