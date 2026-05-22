import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { env } from "../../../config/env.js";
import { AppError } from "../../../shared/errors/AppError.js";
import { generateToken } from "../../../shared/utils/generateToken.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { authConfig } from "../../../config/auth.js";

import { AuthRepository } from "../repositories/AuthRepository.js";

import type {
    LoginDTO,
    RegisterDTO,
} from "../dtos/AuthDTO.js";

export class AuthService {
    private authRepository = new AuthRepository();

    async register(data: RegisterDTO) {
        const userExists =
            await this.authRepository.findByEmail(
                data.email
            );

        if (userExists) {
            throw new AppError(
                MESSAGES.EMAIL_ALREADY_EXISTS,
                409
            );
        }

        const hashedPassword = await bcrypt.hash(
            data.password,
            authConfig.bcrypt.saltRounds
        );

        return this.authRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword,
        });
    }

    async login(data: LoginDTO) {
        const user =
            await this.authRepository.findByEmail(
                data.email
            );

        if (!user) {
            throw new AppError(
                MESSAGES.INVALID_CREDENTIALS,
                401
            );
        }

        const passwordMatch =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!passwordMatch) {
            throw new AppError(
                MESSAGES.INVALID_CREDENTIALS,
                401
            );
        }

        const token = generateToken(
            user.id,
            user.role
        );

        return {
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        };
    }
}