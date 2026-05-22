import jwt from "jsonwebtoken";
import { generateToken } from "../../shared/utils/generateToken.js";
import { describe, it, expect } from "vitest";

describe("GenerateToken", () => {
  it("deve gerar um token válido", () => {
    const token = generateToken("123", "admin");

    expect(token).toBeDefined();

    const decoded = jwt.decode(token);

    expect(decoded).toBeTruthy();
  });
});
