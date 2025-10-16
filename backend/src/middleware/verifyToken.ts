import { Request, Response, NextFunction } from 'express';
import { JwtPayload, verify } from 'jsonwebtoken';
import { JSONResponse } from '../utils/httpStatus';

export async function verifyToken(
	req: Request,
	res: Response,
	next: NextFunction
) {
	let response: JSONResponse;
	try {
		const userData = verify(
			req.cookies.token,
			process.env.JWT_PASSPHRASE as string
		);
		// req.headers["authorization"] = `Bearer ${req.cookies.token}`
		req.body = {...userData as JwtPayload, ...req.body};
		next();
	} catch (error) {
		response = {
			code: 400,
			status: 'ERROR',
			data: null,
			message: 'INVALID TOKEN',
		};
		res.status(response.code).json(response);
	}
}
