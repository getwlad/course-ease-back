import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401);
  }

  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("Ocorreu um erro interno no token");
  }
  jwt.verify(token, secret, (err: any, user: any) => {
    if (err) {
      return res.sendStatus(403);
    }

    next();
  });
}
