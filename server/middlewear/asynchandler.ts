import type {Request,Response,NextFunction,RequestHandler} from "express"

type asyncRequestHandler=(
    req:Request,
    res:Response,
    next:NextFunction
)=>Promise<unknown>


export const asyncHandler=(fn:asyncRequestHandler):RequestHandler=>{
    return (req,res,next)=>{
        Promise.resolve(fn(req,res,next)).catch(next)
    }
}




