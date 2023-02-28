import { Request, Response, NextFunction } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { IUser } from "../models/user.model";
import { MONGO_DB_CONFIG } from "../config/app.config";

const secret = MONGO_DB_CONFIG.TOKEN_KEY;

interface IRequest extends Request {
  user?: IUser;
}

interface ITokenData {
  data: IUser;
}

function authenticationToken(req: IRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(403).send({ message: "No Token Provider" });
  }

  try {
    const decodedToken = jwt.verify(token, secret as Secret) as ITokenData;
    req.user = decodedToken.data;
    next();
  } catch (err) {
    return res.status(401).send({ message: "Unauthorized!" });
  }
}

function generateAccessToken(user: IUser): string {
  const tokenData: ITokenData = { data: user };
  const expiresIn = "1h";
  const secret = MONGO_DB_CONFIG.TOKEN_KEY as Secret;

  return jwt.sign(tokenData, secret, { expiresIn });
}

export { authenticationToken, generateAccessToken };
