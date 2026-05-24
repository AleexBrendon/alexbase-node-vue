import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres."),
  email: z.email("E-mail inválido."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
});

export const loginSchema = z.object({
  email: z.email("E-mail inválido."),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres."),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "Refresh token é obrigatório"),
});

export const forgotPasswordSchema = z.object({
  email: z.email("E-mail inválido."),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(
    1,
    "Token é obrigatório."
  ),

  password: z.string().min(
    6,
    "Senha deve ter no mínimo 6 caracteres."
  ),
});