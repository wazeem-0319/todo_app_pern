import express,{type Request,type Response} from "express"

const app=express();


app.get("/",(req:Request,res:Response)=>{
    res.send("hello world")
})


const server=app.listen(5000,()=>{
    console.log("Server running on port no 5000")
})



