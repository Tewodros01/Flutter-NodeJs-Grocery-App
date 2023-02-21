import { Request, Response } from "express";
import * as userService from "../services/user.service";
import { IUser } from "../models/user.model";

export async function registore(req: Request, res: Response) {
  const user: IUser = {
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
  };
  try {
    const token = await userService.register(user);
    res.json({ message: "success", data: token });
  } catch (err) {
    res.status(500).json({ message: "error", error: `${err}` });
  }
}
export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  try {
    const token = await userService.login(email, password);
    if (token) {
      res.json({ message: "success", data: token });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ message: "error", error: `${err}` });
  }
}

export async function getAllUser(req: Request, res: Response): Promise<void> {
  try {
    const allUser = await userService.getAllUser({
      pageSize: req.query.pageSize?.toString(),
      page: req.query.page?.toString(),
    });
    res.json({ message: "success", data: allUser });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}

export async function deletUser(req: Request, res: Response) {
  try {
    console.log(req.params.id);
    const user = await userService.deletUser(req.params.id);
    res.json({ message: "success", data: user });
  } catch (err) {
    res.status(400).json({ message: "error", error: `${err}` });
  }
}
