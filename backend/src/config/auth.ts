export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || "alexbase_secret",
    expiresIn: "1d",
  },

  bcrypt: {
    saltRounds: 8,
  },
};