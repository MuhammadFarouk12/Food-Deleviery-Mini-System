import express, { Router } from "express";
import dishesController from "../controllers/dishesController";
export const dishesRoute: Router = express.Router()

dishesRoute
	.get("/", dishesController.getAll)
	.get("/:count/:page", dishesController.byPage)
	.post("/add", dishesController.addDish)