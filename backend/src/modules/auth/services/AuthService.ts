import bcrypt from "bcryptjs";
import crypto from "node:crypto";
import { AppError } from "../../../shared/errors/AppError.js";
import { generateToken } from "../../../shared/utils/generateToken.js";
import { MESSAGES } from "../../../shared/constants/messages.js";
import { authConfig } from "../../../config/auth.js";
import { AuthRepository } from "../repositories/AuthRepository.js";
import { RefreshTokenRepository } from "../repositories/RefreshTokenRepository.js";
import type { LoginDTO, RegisterDTO } from "../dtos/AuthDTO.js";
import { PasswordResetRepository } from "../repositories/PasswordResetRepository.js";

export class AuthService {
    private authRepository = new AuthRepository();
    private refreshTokenRepository = new RefreshTokenRepository();
    private passwordResetRepository = new PasswordResetRepository();

    async register(data
        : RegisterDTO) {
        const userExists = await this.authRepository.findByEmail(data.email);

        if (userExists) {
            throw new AppError(MESSAGES.EMAIL_ALREADY_EXISTS, 409);
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
        const user = await this.authRepository.findByEmail(data.email);

        if (!user) {
            throw new AppError(MESSAGES.INVALID_CREDENTIALS, 401);
        }

        const passwordMatch = await bcrypt.compare(data.password, user.password);

        if (!passwordMatch) {
            throw new AppError(MESSAGES.INVALID_CREDENTIALS, 401);
        }

        const token = generateToken(user.id, user.role, user.companyId);

        const refreshToken = crypto.randomUUID();

        const refreshTokenExpiresAt = new Date();
        refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

        await this.refreshTokenRepository.create({
            token: refreshToken,
            userId: user.id,
            expiresAt: refreshTokenExpiresAt,
        });

        return {
            token,
            refreshToken,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                companyId: user.companyId,
            },
        };
    }

    async logout(refreshToken: string) {
        const token =
            await this.refreshTokenRepository.findByToken(
                refreshToken
            );

        if (!token) {
            throw new AppError(
                "Refresh token inválido.",
                401
            );
        }

        await this.refreshTokenRepository.revoke(
            refreshToken
        );

        return {
            success: true,
        };
    }

    async refresh(refreshToken: string) {
        const storedRefreshToken =
            await this.refreshTokenRepository.findByToken(refreshToken);

        if (!storedRefreshToken) {
            throw new AppError("Refresh token inválido.", 401);
        }

        if (storedRefreshToken.revokedAt) {
            throw new AppError("Refresh token revogado.", 401);
        }

        if (storedRefreshToken.expiresAt < new Date()) {
            throw new AppError("Refresh token expirado.", 401);
        }

        await this.refreshTokenRepository.revoke(refreshToken);

        const newToken = generateToken(
            storedRefreshToken.user.id,
            storedRefreshToken.user.role,
            storedRefreshToken.user.companyId
        );

        const newRefreshToken = crypto.randomUUID();

        const refreshTokenExpiresAt = new Date();
        refreshTokenExpiresAt.setDate(refreshTokenExpiresAt.getDate() + 7);

        await this.refreshTokenRepository.create({
            token: newRefreshToken,
            userId: storedRefreshToken.user.id,
            expiresAt: refreshTokenExpiresAt,
        });

        return {
            token: newToken,
            refreshToken: newRefreshToken,
        };
    }

    async forgotPassword(email: string) {
        const user = await this.authRepository.findByEmail(email);

        if (!user) {
            return {
                message: "Se o e-mail existir, enviaremos as instruções.",
            };
        }

        const token = crypto.randomUUID();

        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 30);

        await this.passwordResetRepository.create({
            token,
            userId: user.id,
            expiresAt,
        });

        return {
            message: "Token de recuperação gerado.",
            resetToken: token,
        };
    }

    async resetPassword(token: string, password: string) {
        const resetToken =
            await this.passwordResetRepository.findByToken(token);

        if (!resetToken) {
            throw new AppError("Token de recuperação inválido.", 401);
        }

        if (resetToken.usedAt) {
            throw new AppError("Token de recuperação já utilizado.", 401);
        }

        if (resetToken.expiresAt < new Date()) {
            throw new AppError("Token de recuperação expirado.", 401);
        }

        const hashedPassword = await bcrypt.hash(
            password,
            authConfig.bcrypt.saltRounds
        );

        await this.authRepository.updatePassword(
            resetToken.user.id,
            hashedPassword
        );

        await this.passwordResetRepository.markAsUsed(token);

        return {
            message: "Senha atualizada com sucesso.",
        };
    }
}