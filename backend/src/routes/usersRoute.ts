import express, {type Router} from "express"
import getUsers from "../controllers/usersController.ts"
const usersRoute: Router = express.Router()
usersRoute.get
	("/", getUsers)
export default usersRoute
