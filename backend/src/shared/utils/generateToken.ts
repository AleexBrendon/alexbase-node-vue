import jwt from "jsonwebtoken";

import { authConfig } from "../../config/auth.js";

export function generateToken(
  id: string,
  role: string
) {
  return jwt.sign(
    {
      sub: id,
      role,
    },
    authConfig.jwt.secret as jwt.Secret,
    {
      expiresIn: authConfig.jwt.expiresIn,
    } as jwt.SignOptions
  );
}