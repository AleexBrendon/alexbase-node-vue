import request from "supertest";
import { app } from "../../app.js";
import { describe, it, expect } from "vitest";

describe("Auth E2E", () => {
  it("deve registrar usuário", async () => {
    const email = `alex-register-${Date.now()}@email.com`;

    const response = await request(app)
      .post("/auth/register")
      .send({
        name: "Alex",
        email,
        password: "123456",
      });

    expect(response.status).toBe(201);
  });

  it("deve fazer login", async () => {
    const email = `alex-login-${Date.now()}@email.com`;

    await request(app)
      .post("/auth/register")
      .send({
        name: "Alex Login",
        email,
        password: "123456",
      });

    const response = await request(app)
      .post("/auth/login")
      .send({
        email,
        password: "123456",
      });

    expect(response.status).toBe(200);
    expect(response.body.data.token).toBeDefined();
    expect(response.body.data.user).toBeDefined();
  });
});