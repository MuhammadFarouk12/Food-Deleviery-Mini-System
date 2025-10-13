import { Request, Response, NextFunction } from "express";
import { Prisma, PrismaClient } from "../../generated/prisma";
import bcrypt from "bcryptjs"
import { HTTPResponseStatus, JSONResponse } from "../utils/httpStatus";
import { JWT } from "../utils/createJWT";
import jwt from "jsonwebtoken";
const prisma = new PrismaClient()

export function registerController(req: Request, res: Response, next: NextFunction){
	async function addUserToDB(){
		try{
			const user = await prisma.users.create({
				data: {
					user_name: req.body.username.toString(),
					user_password: bcrypt.hashSync(req.body.password.toString(), 10)
				}	
			})
			const response: JSONResponse = {
				status: "SUCCESS",
				code: 200,
				data: {user_id: user.user_id, user_name: user.user_name}
			}
			const userToken = JWT({user_name: user.user_name, user_id: user.user_id, iat: Date.now()})
			res.cookie('token', userToken, {path: '/', sameSite: true})	
			res.json(response)

		} catch(error){
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				const response: JSONResponse = {
					status: "ERROR",
					code: 400,
					data: null,
					message: error.message
				}
				res.status(response.code).json(response)
			}
		}
	}
	addUserToDB()
} 