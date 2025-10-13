import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs"
import { JSONResponse } from "../utils/httpStatus";
import { JWT } from "../utils/createJWT";
import z, { ZodError } from "zod"

const prisma = new PrismaClient()

const RegisterRequest = z.object({
	user_name: z.string(),
	user_password: z.string()
})

async function createUser(req: Request){
	const user = await prisma.users.create({
		data: {
			user_name: req.body.user_name,
			user_password: bcrypt.hashSync(req.body.user_password, 10)
		}
	})
	return user
}

export async function registerController(req: Request, res: Response, next: NextFunction){
	let response: JSONResponse = { status: "ERROR", code: 500, data: null, message: "Internal Server Error At Register Controller" }
	try {
		RegisterRequest.parse(req.body)
		const user =  await createUser(req)
		const userToken = JWT({user_name: user.user_name, user_id: user.user_id, iat: Date.now()})
		response = { status: "SUCCESS", code: 200, data: {user_id: user.user_id, user_name: user.user_name} }
		res.cookie('token', userToken, {path: '/', sameSite: true})	
	} catch (error) {
		if(error instanceof ZodError){
			 response = { status: "ERROR", code: 400, data: null, message: error.message }
		}
		else if (error instanceof Prisma.PrismaClientKnownRequestError) {
				response = { status: "ERROR", code: 400, data: null, message: error.message }
		}
	} finally {
		res.status(response.code).json(response)
	}
} 