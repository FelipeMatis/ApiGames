import { AppDataSource } from "@shared/typeorm/data-source";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "@config/auth";

interface IRequest {
    email: string;
    senha: string;
}

interface IResponse {
    user: User;
    token: string;
}

export default class CreateSessionService {
    public async execute({ email, senha }: IRequest): Promise<IResponse> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('E-mail ou senha incorretos', 401);
        }

        const senhaCorreta = await compare(senha, user.senha);

        if (!senhaCorreta) {
            throw new AppError('E-mail ou senha incorretos', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: user.id,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return { user, token };
    }
}
