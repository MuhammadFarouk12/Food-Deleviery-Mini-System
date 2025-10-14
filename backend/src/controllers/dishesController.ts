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
			response = {status: "ERROR", code: 422, data: null, message: `Request Have Some Fields Invalid or Missing` }
		} else {
			response.message = `Internal Server Error`
		}	
	}
	res.status(response.code).json(response)
}

export default {
	getAll,
	byPage
}