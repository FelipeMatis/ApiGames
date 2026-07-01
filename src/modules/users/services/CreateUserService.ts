import { AppDataSource } from "@shared/typeorm/data-source";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";

interface IRequest {
    nome: string;
    email: string;
    senha: string;
    avatar?: string;
    bio?: string;
}

export default class CreateUserService {
    public async execute({ nome, email, senha, avatar, bio }: IRequest): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        const emailExists = await userRepository.findOne({ where: { email } });

        if (emailExists) {
            throw new AppError('Já existe um usuário com esse e-mail');
        }

        if (!nome || !email || !senha) {
            throw new AppError('Campos obrigatórios não preenchidos');
        }

        const senhaHash = await hash(senha, 8);

        const user = userRepository.create({
            nome,
            email,
            senha: senhaHash,
            avatar,
            bio,
        });

        await userRepository.save(user);

        return user;
    }
}
