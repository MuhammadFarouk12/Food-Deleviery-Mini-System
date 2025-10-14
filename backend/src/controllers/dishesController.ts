import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import { JSONResponse } from "../utils/httpStatus";

const prisma = new PrismaClient()
export async function getDishesController(req: Request, res: Response, next: NextFunction){
		const dishes = await prisma.dishes.findMany()

		const response: JSONResponse = {
			code: 200,
			data: dishes,
			status: "SUCCESS",
		}

		res.status(response.code).json(response)
}