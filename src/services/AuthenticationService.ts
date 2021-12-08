import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UserRepository } from "../repositories/UserRepository";
import { classToPlain } from "class-transformer";

interface Iauth {
    email: string,
    password: string
}

class AuthenticationService {
    async login({email, password} : Iauth) {
        const userRepository = getCustomRepository(UserRepository);
        
        const user = await userRepository.findOne({
            email
        });

        if (!user) {
            throw new Error('incorrect email or password');
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new Error('incorrect email or password');
        }

        const token = sign(
            {
                user_id: user.id
            },
            "19uudasç139sdaopsjdhahso8y12983y",
            {
                expiresIn: '1d'
            }
        );

        return {
            token: token,
            user: classToPlain(user)
        };
    }
}

export { AuthenticationService };