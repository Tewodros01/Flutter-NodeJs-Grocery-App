import { Router } from "express";
import {
  registore,
  login,
  getAllUser,
  deletUser,
} from "../../controllers/user.controller";

const user_router: Router = Router();

user_router.get("/", getAllUser);
user_router.post("/login", login);
user_router.post("/registor", registore);
user_router.delete("/:id", deletUser);

export default user_router;
