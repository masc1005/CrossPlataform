import { Router } from "express";
import user from "../src/controllers/userController";
import role from "./controllers/roleController";

const routes = Router();

routes.post("/user", user.create);

routes.post("/role", role.create);

export default routes;