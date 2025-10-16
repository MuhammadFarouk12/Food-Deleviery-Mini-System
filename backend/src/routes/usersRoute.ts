import express, {type Router} from "express"
import getUsers from "../controllers/usersController.ts"
import { allowToUser } from "../utils/allowToUser.ts";

const usersRoute: Router = express.Router()
usersRoute.get
	("/", allowToUser(false), getUsers)
export default usersRoute
