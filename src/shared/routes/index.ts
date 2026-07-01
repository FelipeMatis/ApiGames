import { Router } from "express";
import gameRouter from "@modules/games/routes/game.routes";
import userRouter from "@modules/users/routes/user.routes";
import reviewRouter from "@modules/reviews/routes/review.routes";

const routes = Router();

routes.get('/', (request, response) => {
    response.json({ message: 'API Games - Online!' });
    return;
});

routes.use('/users', userRouter);
routes.use('/games', gameRouter);
routes.use('/games/:game_id/reviews', reviewRouter);

export default routes;
