import { Request, Response, NextFunction } from "express"
import { Prisma, PrismaClient } from "../../generated/prisma"
const prisma = new PrismaClient()

function getUsers(req: Request, res: Response, next: NextFunction){
	async function asyncGetUsersFromDB(){
		const users = await prisma.orders_join.findMany()
		res.json(users)
	}
	asyncGetUsersFromDB()
}

export default getUsers