import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { JSONResponse } from "../utils/httpStatus";
import z, { ZodError } from "zod";
import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library";
const prisma = new PrismaClient()
async function getAll(req: Request, res: Response, next: NextFunction){
		const dishes = await prisma.dishes.findMany()

		const response: JSONResponse = {
			code: 200,
			data: dishes,
			status: "SUCCESS",
		}

		res.status(response.code).json(response)
}

async function byPage(req: Request, res: Response, next: NextFunction){
	const JSONPaginationRequestData = z.object({ count: z.number(), skip: z.number() })
	let response: JSONResponse = {code: 500, data: null, status: "FAIL", message: "Internal Server Error"}
	const skip = Number(req.params.count) * (Number(req.params.page) - 1)
	const count = Number(req.params.count)
	try {
		JSONPaginationRequestData.parse({ count, skip })	
		const dishes = await prisma.dishes.findMany({
			take: count,
			skip: skip
		})
		response = {status: "SUCCESS", code: 200, data: dishes, message: null}
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			response.message = `Prisma Error:\n${error.message}`
		} else if (error instanceof ZodError){
			response = { status: "ERROR", code: 422, data: null, message: `Request Have Some Fields Invalid or Missing` }
		} else {
			response.message = `Internal Server Error`
		}	
	}
	res.status(response.code).json(response)
}

async function addDish(req: Request, res: Response, next: NextFunction){
	const addDishRequest = z.object({
			dish_name: z.string(),
			dish_price: z.number()
	})
	let response: JSONResponse;
	try {
			addDishRequest.parse(req.body)		
			const dishName = req.body.dish_name;
			const dishPrice = req.body.dish_price;
			const dish = await prisma.dishes.create({
				data: {
					dish_name: dishName,
					dish_price: dishPrice
				}
			})
			response = {status: "SUCCESS", data: dish, code: 200, message: `Dish ${dishName} with price: ${dishPrice} has been added successfully`}
			res.json(response)
	} catch (error) {
		if (error instanceof PrismaClientKnownRequestError) {
			response = {status: "FAIL", code: 500, data: null, message: `Prisma Error:\n${error.message}` }
		} else if (error instanceof ZodError){
			response = {status: "ERROR", code: 422, data: null, message: `Request Have Some Fields Invalid or Missing` }
		} else {
			response = {status: "FAIL", code: 500, data: null, message: `Internal Server Error` }
		}	
	}
}


export default { getAll, byPage, addDish }















