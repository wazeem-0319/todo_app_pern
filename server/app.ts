import {setEnv} from "./config/env.config.js"
import express,{type Request,type Response} from "express"
import {notFoundError} from "./error/index.js"
import Router from "./routes/todo.route.js" 
import { errorHandler } from "./middlewear/errorhandler.js"
import cors from "cors"

const app=express();

app.use(express.json())
app.use(cors())

app.use(Router)

app.use((req, res, next) => {
  next(new notFoundError(`Route ${req.originalUrl} not found`));
});

app.use(errorHandler);

const server=app.listen(5000,()=>{
    console.log("Server running on port no 5000")
})



