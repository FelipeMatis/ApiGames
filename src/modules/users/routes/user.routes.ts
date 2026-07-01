import { Router } from "express";
import UserController from "../controllers/UserController";
import { isAuthenticated } from "@shared/middlewares/isAuthenticated";

const userRouter = Router();
const userController = new UserController();

// Rotas públicas
userRouter.post('/registro', async (req, res, next) => {
    try {
        await userController.register(req, res, next);
    } catch (err) {
        next(err);
    }
});

userRouter.post('/sessao', async (req, res, next) => {
    try {
        await userController.login(req, res, next);
    } catch (err) {
        next(err);
    }
});

// Rotas protegidas
userRouter.get('/perfil', isAuthenticated, async (req, res, next) => {
    try {
        await userController.profile(req, res, next);
    } catch (err) {
        next(err);
    }
});

export default userRouter;
