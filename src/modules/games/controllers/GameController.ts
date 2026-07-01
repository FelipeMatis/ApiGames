import { Request, Response, NextFunction } from "express";
import ListGamesService from "../services/ListGamesService";
import ShowGameService from "../services/ShowGameService";
import CreateGameService from "../services/CreateGameService";
import UpdateGameService from "../services/UpdateGameService";
import DeleteGameService from "../services/DeleteGameService";

export default class GameController {

    public async index(
        request: Request,
        response: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const listGames = new ListGamesService();
            const games = await listGames.execute();

            return response.status(200).json(games);
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
            const showGame = new ShowGameService();
            const game = await showGame.execute({ id });

            return response.status(200).json(game);
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
            const {
                nome,
                genero,
                plataforma,
                data_lancamento,
                classificacao_indicativa,
                desenvolvedora
            } = request.body;

            const createGame = new CreateGameService();

            const game = await createGame.execute({
                nome,
                genero,
                plataforma,
                data_lancamento,
                classificacao_indicativa,
                desenvolvedora
            });

            return response.status(201).json(game);
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
            const { id } = request.params as { id: string };
            const updateData = request.body;

            const updateGame = new UpdateGameService();

            const game = await updateGame.execute({
                id,
                ...updateData
            });

            return response.status(200).json(game);
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
            const { id } = request.params as { id: string };

            const deleteGame = new DeleteGameService();
            await deleteGame.execute({ id });

            return response.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}