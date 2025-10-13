import express, {Request, Response, NextFunction } from "express"
import usersRoute from "./routes/usersRoute.ts"
import { registerRoute } from "./routes/registerRoute.ts"
import cookieParser from "cookie-parser"
const app = express()
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/register", registerRoute)

app.listen(3000, () => {
	console.log("SERVER IS RUNNING VIA PORT 3000")
})
