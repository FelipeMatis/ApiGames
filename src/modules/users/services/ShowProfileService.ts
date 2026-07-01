import { AppDataSource } from "@shared/typeorm/data-source";
import User from "../typeorm/entities/User";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
}

export default class ShowProfileService {
    public async execute({ id }: IRequest): Promise<User> {
        const userRepository = AppDataSource.getRepository(User);

        const user = await userRepository.findOneBy({ id });

        if (!user) {
            throw new AppError('Usuário não encontrado');
        }

        return user;
    }
}
