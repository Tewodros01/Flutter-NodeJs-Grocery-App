import { Router } from "express";
import {
  registore,
  login,
  getAllUser,
} from "../../controllers/user.controller";

const user_router: Router = Router();

user_router.get("/", getAllUser);
user_router.post("/", login);
user_router.post("/registor", registore);

export default user_router;
