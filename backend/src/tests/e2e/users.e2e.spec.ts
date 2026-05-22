import request from "supertest";
import { app } from "../../app.js";
import { describe, it, expect } from "vitest";

describe("Users E2E", () => {
  it("não deve listar usuários sem token", async () => {
    const response = await request(app).get("/users");

    expect(response.status).toBe(401);
  });

  it("não deve listar usuários com token de user comum", async () => {
    const email = `user-${Date.now()}@email.com`;

    await request(app)
      .post("/auth/register")
      .send({
        name: "User Test",
        email,
        password: "123456",
      });

    const loginResponse = await request(app)
      .post("/auth/login")
      .send({
        email,
        password: "123456",
      });

    const token = loginResponse.body.data.token;

    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(403);
  });
});