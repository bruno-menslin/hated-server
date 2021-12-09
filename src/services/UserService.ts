import { getCustomRepository, Not } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { hash } from "bcryptjs";
import { classToPlain } from "class-transformer";

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

        const passwordHash = await hash(password, 8);

        const user = userRepository.create({
            username: username,
            email: email,
            password: passwordHash,
            admin: admin
        });

        await userRepository.save(user);

        return user;
    }

    async find() {
        const userRepository = getCustomRepository(UserRepository);

        const users = await userRepository.find();

        return classToPlain(users);
    }

    async findOne(id: string) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        return classToPlain(user);
    }

    async update(id: string, {username, email, password, admin = false} : Iuser) {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        if (!user) {
            throw new Error('user not found');
        }

        const userAlreadyExists = await userRepository.findOne({
            where: [
                {id: Not(id), username: username},
                {id: Not(id), email: email}
            ]
        });

        if (userAlreadyExists) {
            throw new Error('username or email already exists');
        }

        const passwordHash = await hash(password, 8);

        userRepository.merge(user, {
            username: username, 
            email: email, 
            password: passwordHash,
            admin: admin
        });

        await userRepository.save(user);

        return classToPlain(user);
    }
}

export { UserService };