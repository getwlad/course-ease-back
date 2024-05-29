require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});
import jwt from "jsonwebtoken";

class TokenService {
  generateToken(id: number): string {
    try {
      const secret = process.env.JWT_SECRET;
      const expiresIn = process.env.JWT_EXPIRATION;

      if (!secret || !expiresIn) {
        throw new Error("Ocorreu um erro interno no token");
      }

      return jwt.sign({ id }, secret, {
        expiresIn,
      });
    } catch (error) {
      throw new Error("Erro ao autenticar usuário");
    }
  }
}

export default TokenService;
