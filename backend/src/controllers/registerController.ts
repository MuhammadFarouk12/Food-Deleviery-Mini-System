import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs"
import { JSONResponse } from "../utils/httpStatus";
import { JWT } from "../utils/createJWT";
import z from "zod"
import handleZodPrismaServerErrors from "../utils/errorHandler";

const prisma = new PrismaClient()

const RegisterRequest = z.object({
	user_name: z.string(),
	user_password: z.string(),
	is_admin: z.boolean()
})

async function createUser(req: Request){
	const user = await prisma.users.create({
		data: {
			user_name: req.body.user_name,
			user_password: bcrypt.hashSync(req.body.user_password, 10),
			is_admin: req.body.is_admin
		}
	})
	return user
}

export async function registerController(req: Request, res: Response, next: NextFunction){
	let response: JSONResponse;
	try {
		RegisterRequest.parse(req.body)
		const user =  await createUser(req)
		const userToken = JWT({user_name: user.user_name, user_id: user.user_id, iat: Date.now(), is_admin: user.is_admin || false})
		response = { status: "SUCCESS", code: 200, data: {user_id: user.user_id, user_name: user.user_name} }
		res.cookie('token', userToken, {path: '/', sameSite: true})	
	} catch (error) {
		response = handleZodPrismaServerErrors(error as Error)	
	}
	res.status(response.code).json(response)
} 





