import { describe, it, expect, beforeEach, afterAll } from "vitest";
import { prisma } from "../../database/prisma.js";
import { AuthService } from "../../modules/auth/services/AuthService.js";
import { AppError } from "../../shared/errors/AppError.js";
import { MESSAGES } from "../../shared/constants/messages.js";

const authService = new AuthService();

describe("AuthService Integration", () => {
  beforeEach(async () => {
    await prisma.user.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("deve registrar um usuário", async () => {
    const user = await authService.register({
      name: "Alex Admin",
      email: "alex@test.com",
      password: "123456",
    });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Alex Admin");
    expect(user.email).toBe("alex@test.com");
    expect(user.role).toBeDefined();
    expect(user).not.toHaveProperty("password");
  });

  it("não deve registrar usuário com email duplicado", async () => {
    await authService.register({
      name: "Alex Admin",
      email: "alex@test.com",
      password: "123456",
    });

    await expect(
      authService.register({
        name: "Alex Duplicado",
        email: "alex@test.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      authService.register({
        name: "Alex Duplicado",
        email: "alex@test.com",
        password: "123456",
      })
    ).rejects.toMatchObject({
      message: MESSAGES.EMAIL_ALREADY_EXISTS,
      statusCode: 409,
    });
  });

  it("deve fazer login", async () => {
    await authService.register({
      name: "Alex Admin",
      email: "alex@test.com",
      password: "123456",
    });

    const response = await authService.login({
      email: "alex@test.com",
      password: "123456",
    });

    expect(response).toHaveProperty("token");
    expect(typeof response.token).toBe("string");

    expect(response.user).toHaveProperty("id");
    expect(response.user.name).toBe("Alex Admin");
    expect(response.user.email).toBe("alex@test.com");
    expect(response.user.role).toBeDefined();
  });

  it("não deve fazer login com senha inválida", async () => {
    await authService.register({
      name: "Alex Admin",
      email: "alex@test.com",
      password: "123456",
    });

    await expect(
      authService.login({
        email: "alex@test.com",
        password: "senha-errada",
      })
    ).rejects.toMatchObject({
      message: MESSAGES.INVALID_CREDENTIALS,
      statusCode: 401,
    });
  });

  it("não deve fazer login com usuário inexistente", async () => {
    await expect(
      authService.login({
        email: "naoexiste@test.com",
        password: "123456",
      })
    ).rejects.toMatchObject({
      message: MESSAGES.INVALID_CREDENTIALS,
      statusCode: 401,
    });
  });
});