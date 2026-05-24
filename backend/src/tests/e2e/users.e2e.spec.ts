import request from "supertest";
import bcrypt from "bcryptjs";

import { app } from "../../app.js";
import { prisma } from "../../database/prisma.js";
import { generateToken } from "../../shared/utils/generateToken.js";

describe("Users E2E", () => {
  it("não deve listar usuários sem token", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
  });

  it("não deve listar usuários com token de user comum", async () => {
    const company = await prisma.company.create({
      data: {
        name: "Empresa Teste",
      },
    });

    const password = await bcrypt.hash("123456", 8);

    const user = await prisma.user.create({
      data: {
        name: "User Comum",
        email: `user-comum-${Date.now()}@email.com`,
        password,
        role: "user",
        companyId: company.id,
      },
    });

    const token = generateToken(
      user.id,
      user.role,
      user.companyId
    );

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
});