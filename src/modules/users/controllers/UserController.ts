import { Request, Response, NextFunction } from "express";
import CreateUserService from "../services/CreateUserService";
import CreateSessionService from "../services/CreateSessionService";
import ShowProfileService from "../services/ShowProfileService";

export default class UserController {

    public async register(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { nome, email, senha, avatar, bio } = request.body;

            const createUser = new CreateUserService();
            const user = await createUser.execute({ nome, email, senha, avatar, bio });

            const { senha: _, ...userSemSenha } = user as any;

            return response.status(201).json(userSemSenha);
        } catch (err) {
            next(err);
        }
    }

    public async login(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { email, senha } = request.body;

            const createSession = new CreateSessionService();
            const { user, token } = await createSession.execute({ email, senha });

            const { senha: _, ...userSemSenha } = user as any;

            return response.status(200).json({ user: userSemSenha, token });
        } catch (err) {
            next(err);
        }
    }

    public async profile(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id } = request.user;

            const showProfile = new ShowProfileService();
            const user = await showProfile.execute({ id });

            const { senha: _, ...userSemSenha } = user as any;

            return response.status(200).json(userSemSenha);
        } catch (err) {
            next(err);
        }
    }
}
