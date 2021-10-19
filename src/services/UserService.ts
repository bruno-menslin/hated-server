import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";

interface Iuser {
    username: string
    email: string
    password: string
    admin?: boolean
}

class UserService {
    async create({username, email, password, admin = false} : Iuser) {
        const userRepository = getCustomRepository(UserRepository);

        const userAlreadyExists = await userRepository.findOne({
            where: [
                {username: username},
                {email: email}
            ]
        });

        if (userAlreadyExists) {
            throw new Error('username or email already exists');
        }

        const user = userRepository.create({
            username: username,
            email: email,
            password: password,
            admin: admin
        });

        await userRepository.save(user);

        return user;
    }
}

export { UserService };