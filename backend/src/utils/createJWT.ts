import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
type Payload = {
	iat: number
	user_name: string
	user_id: number
	is_admin: boolean 
}
export function JWT(payload: Payload){
			return jwt.sign(
				payload,
				process.env.JWT_PASSPHRASE as string,
				{expiresIn: '30d'}
			)
}