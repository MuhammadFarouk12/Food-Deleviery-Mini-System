import express, { Router } from "express";
import dishesController from "../controllers/dishesController";
import { allowToUser } from "../utils/allowToUser";
export const dishesRoute: Router = express.Router()

dishesRoute
	.get("/", dishesController.getAll)
	.get("/:count/:page", dishesController.byPage)
	.post("/add", allowToUser(false), dishesController.addDish)
	.patch("/edit/:dishId", allowToUser(false), dishesController.patchDish)