import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { JSONResponse } from "../utils/httpStatus";
import handleZodPrismaServerErrors from "../utils/errorHandler";
import z from "zod";
const prisma = new PrismaClient()

async function getOrders(req: Request, res: Response, next: NextFunction) {
	let response: JSONResponse;
	try {
		const orders = await prisma.orders_join.findMany()
		response = { code: 200, status: "SUCCESS", message: null, data: orders }
	} catch (error) {
		response = handleZodPrismaServerErrors(error as Error)	
	}	
	res.status(response.code).json(response)
}

async function makeOrder(req: Request, res: Response, next: NextFunction) {
	let response: JSONResponse
	const requestOrderSchema = z.object({
		user_id: z.number(),
		dish_id: z.number()
	})
	try {
		requestOrderSchema.parse(req.body)
		const order = await prisma.orders.create({
			data: {
				user_id: req.body.user_id,
				dish_id: req.body.dish_id
			}
		})	
		const orderData = await prisma.orders_join.findFirst({
			where: {
				order_id: order.order_id
			}
		})	
		response = {code: 200, data: {...order, ...orderData}, message: `You ordered ${orderData?.dish_name} successfully, with a price of ${orderData?.dish_price}$`, status: "SUCCESS"}
	} catch (error) {
		response = handleZodPrismaServerErrors(error as Error)	
	}
	res.status(response.code).json(response)
}
export default {
	getOrders,
	makeOrder
}