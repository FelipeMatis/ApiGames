import { Router } from "express";
import GameController from "../controllers/GameController";

const gameRouter = Router();
const gameController = new GameController();

gameRouter.get('/', async (req, res, next) => {
    try {
        await gameController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

gameRouter.get('/:id', async (req, res, next) => {
    try {
        await gameController.show(req, res, next);
    } catch (err) {
        next(err);
    }
});

gameRouter.post('/', async (req, res, next) => {
    try {
        await gameController.create(req, res, next);
    } catch (err) {
        next(err);
    }
});

gameRouter.put('/:id', async (req, res, next) => {
    try {
        await gameController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

gameRouter.patch('/:id', async (req, res, next) => {
    try {
        await gameController.update(req, res, next);
    } catch (err) {
        next(err);
    }
});

gameRouter.delete('/:id', async (req, res, next) => {
    try {
        await gameController.delete(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default gameRouter;