import { Router } from "express";

import user from "../src/controllers/userController";
import role from "./controllers/roleController";
import auth from "./controllers/authController";

import authMiddleware from "./middlewares/authMiddleware";

const routes = Router();

routes.post("/user", user.create);
routes.get("/user", authMiddleware, user.read)

routes.post("/role", role.create);
routes.get("/role", role.read);
routes.put('/role', role.update)
routes.delete('/role', role.delete)

routes.post('/userRole', user.userRole)


routes.post("/auth", auth.authenticate);


export default routes;