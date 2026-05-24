import jwt from "jsonwebtoken";

import { authConfig } from "../../config/auth.js";

export function generateToken(
  userId: string,
  role: string,
  companyId: string
) {
  return jwt.sign(
    {
      role,
      companyId,
    },
    authConfig.jwt.secret,
    {
      subject: userId,
      expiresIn: authConfig.jwt.expiresIn,
    }
  );
}