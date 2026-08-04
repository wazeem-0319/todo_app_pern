import type {Request,Response,NextFunction} from "express"
import { appError } from "../error/appError.js"


export function errorHandler(
    err:Error,
    req:Request,
    res:Response,
    next:NextFunction,

){

    if(err instanceof appError){
        return res.status(err.statusCode).json({
            status:"error",
            message:err.message

        })
    }

    console.log("Unexpected Error",err)

    return res.status(500).json({
        status:"error",
        message:"Something went wrong"
    })
}












