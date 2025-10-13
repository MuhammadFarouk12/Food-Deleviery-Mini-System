import express from "express";
import { Router } from "express";
import { loginController } from "../controllers/loginController";
export const loginRoute: Router = express.Router()
loginRoute.post('/', loginController)