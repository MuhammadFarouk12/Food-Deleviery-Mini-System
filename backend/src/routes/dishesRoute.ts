import express, { Router } from "express";
import getDishesController from "../controllers/dishesController";
export const dishesRoute: Router = express.Router()

dishesRoute
	.get("/", getDishesController.getAll)
	.get("/:count/:page", getDishesController.byPage)