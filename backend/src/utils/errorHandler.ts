import { PrismaClientKnownRequestError } from "../../generated/prisma/runtime/library"
import { JSONResponse } from "./httpStatus";
import { ZodError } from "zod";

export default function handleZodPrismaServerErrors(error: Error): JSONResponse{
	if (error instanceof PrismaClientKnownRequestError) {
		return {status: "FAIL", code: 400, data: null, message: `Prisma Error:\n${error.message}` }
	} else if (error instanceof ZodError){
		// JSON.parse()[0].path[0]
		let zodErrorObject = JSON.parse(error.message)[0]
		console.log(zodErrorObject)
		return { status: "ERROR", code: 422, data: null, message: `${zodErrorObject.message} at "${zodErrorObject.path[0]}"` }
	} else {
		return {status: "FAIL", code: 500, data: null, message: `Internal Server Error` }
	}
}	