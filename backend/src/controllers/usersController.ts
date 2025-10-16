import { Request, Response, NextFunction, response } from "express"
import { Prisma, PrismaClient } from "../../generated/prisma"
import { JSONResponse } from "../utils/httpStatus";
import handleZodPrismaServerErrors from "../utils/errorHandler";
const prisma = new PrismaClient()

async function getUsers(req: Request, res: Response, next: NextFunction){
	let response: JSONResponse;
	try {
		const users = await prisma.users.findMany({
			select: {
				user_name: true,
				user_id: true,
				is_admin: true,
				user_password: false
			}
		})
		response = { status: "SUCCESS", code: 200, data: users }
	} catch (error) {
		response = handleZodPrismaServerErrors(error as Error)	
	}
	res.status(response.code).json(response)
}

export default getUsers