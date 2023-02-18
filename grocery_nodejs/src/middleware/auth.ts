import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import MONGO_DB_CONFIG from "../config/app.config";
import { IUser } from "../models/user_model";

const TOKEN_KEY = MONGO_DB_CONFIG.TOKEN_KEY;

interface IRequest extends Request {
  user?: IUser;
}

function authenticationToken(req: IRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(400);
  }
  jwt.verify(token, TOKEN_KEY, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user as IUser;
    next();
  });
}

function generateAccessToken(user: IUser): string {
  return jwt.sign(
    {
      data: user,
    },
    TOKEN_KEY,
    {
      expiresIn: "1h",
    }
  );
}

export { authenticationToken, generateAccessToken };
