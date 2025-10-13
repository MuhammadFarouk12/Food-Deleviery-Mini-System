export type HTTPResponseStatus = "ERROR" | "SUCCESS" | "FAIL"
export type JSONResponse = {
	status: HTTPResponseStatus
	data: null | object
	code: number
	message?: string
}