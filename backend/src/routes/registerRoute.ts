import  express, {type Router}  from "express";
import { registerController } from "../controllers/registerController";

export const registerRoute: Router = express.Router()

registerRoute.post("/", registerController)