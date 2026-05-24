import request from "supertest";
import { beforeAll, describe, expect, it } from "vitest";

import { app } from "../../app.js";

let adminToken = "";
let userToken = "";

describe("Permissions E2E", () => {
  beforeAll(async () => {
    const timestamp = Date.now();

    const adminEmail = `admin.permissions.${timestamp}@test.com`;
    const userEmail = `user.permissions.${timestamp}@test.com`;

    await request(app).post("/auth/register").send({
      name: "Admin Permissions",
      email: adminEmail,
      password: "123456",
      role: "admin",
    });

    const adminLogin = await request(app).post("/auth/login").send({
      email: adminEmail,
      password: "123456",
    });

    adminToken = adminLogin.body.data.token;

    await request(app)
      .post("/users")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        name: "User Permissions",
        email: userEmail,
        password: "123456",
        role: "user",
      });

    const userLogin = await request(app).post("/auth/login").send({
      email: userEmail,
      password: "123456",
    });

    userToken = userLogin.body.data.token;
  });

  it("admin deve listar usuários", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(response.status).toBe(200);
  });

  it("user não deve listar usuários", async () => {
    const response = await request(app)
      .get("/users")
      .set("Authorization", `Bearer ${userToken}`);

    expect(response.status).toBe(403);
  });
});