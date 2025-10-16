import express, {Request, Response, NextFunction } from "express"
import usersRoute from "./routes/usersRoute.ts"
import { registerRoute } from "./routes/registerRoute.ts"
import { loginRoute } from "./routes/loginRoute.ts"
import { dishesRoute } from "./routes/dishesRoute.ts"
import { verifyToken } from "../middleware/verifyToken.ts"

import cookieParser from "cookie-parser"
import cors from "cors"
const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use("/api/v1/register", registerRoute)
app.use("/api/v1/login", loginRoute)
app.use("/api/v1/users",verifyToken, usersRoute)
app.use("/api/v1/dishes",verifyToken, dishesRoute)
app.listen(3000, () => {
	console.log("SERVER IS RUNNING VIA PORT 3000")
})
