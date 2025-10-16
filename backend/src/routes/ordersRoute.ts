import express, { Router } from "express"
import ordersController from "../controllers/ordersController.ts"

export const ordersRoute: Router = express.Router()

ordersRoute
	.get("/", ordersController.getOrders)
	.post("/order", ordersController.makeOrder)
	.get("/myOrders", ordersController.myOrders)
	