import {Router} from "express"
import {createToDo,getAllData} from "../controller/todo.controller.js"

const route=Router();


route.post("/",createToDo)
route.get("/",getAllData)


export default route;



