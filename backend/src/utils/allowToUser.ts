import { Request, Response, NextFunction } from "express";
import { JSONResponse } from "./httpStatus";
export function allowToUser(yesAllowToUser: boolean){

	return async function (req: Request, res: Response, next: NextFunction){
		let response: JSONResponse
		console.log(req.body.is_admin);
		if (yesAllowToUser || req.body.is_admin) {
			next()	
		} else {
			response = {code: 403, message: "This Page Is Available Only To Admins", status: "ERROR", data: null}
			res.status(response.code).json(response)
		}
	}
}