import { Request, Response, NextFunction } from "express";
import { JWT } from "../utils/createJWT.ts"
import { Prisma, PrismaClient } from "../../generated/prisma";
import dotenv from "dotenv"
import z from "zod";
import { JSONResponse } from "../utils/httpStatus";
import bcrypt from "bcryptjs"
import handleZodPrismaServerErrors from "../utils/errorHandler.ts";

const prisma = new PrismaClient()
dotenv.config()

async function getUser(user_name: string){
	return await prisma.users.findUnique({where: {user_name: user_name}})
}
const LoginRequestSchema = z.object({
	user_name: z.string(),
	user_password: z.string()
})
export async function loginController(req: Request, res: Response, next: NextFunction){
	let response: JSONResponse; 
	try {
		await LoginRequestSchema.parseAsync(req.body)
		const user = await getUser(req.body.user_name)
		if(user){
			const isPasswordCorrect = bcrypt.compareSync(req.body.user_password, user.user_password)
			if(isPasswordCorrect){
				response = {status: "SUCCESS", code: 200, data: null, message: `${user.user_name} Have Successfully Logged In` }
				res.cookie('token', JWT({user_name: user.user_name, user_id: user.user_id, iat: Date.now(), is_admin: user.is_admin || false}), {sameSite: true, path: "/"})
			} else {
				response = {status: "ERROR", code: 401, data: null, message: `Incorrect Password or Username` }
			}
		} else {
			response = {status: "ERROR", code: 400, data: null, message: `Username Does Not Exist` }
		}
	} catch(error){
		response = handleZodPrismaServerErrors(error as Error)
	}
	res.status(response.code).json(response)
}