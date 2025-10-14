import { Request, Response, NextFunction } from "express"
import { Prisma, PrismaClient } from "../../generated/prisma"
const prisma = new PrismaClient()

async function getUsers(req: Request, res: Response, next: NextFunction){
	const users = await prisma.users.findMany({
		select: {
			user_name: true,
			user_id: true,
			user_password: false
		}
	})
	res.json(users)
}

export default getUsers