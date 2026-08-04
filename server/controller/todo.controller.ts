import {pool} from "../config/db.config.js"
import { notFoundError,appError,validationError,unAuthorizedError} from "../error/index.js"
import { asyncHandler } from "../middlewear/asynchandler.js"


export const getAllData=asyncHandler(async(req,res)=>{

    let result;

    try {
        result=await pool.query("SELECT * FROM todo")
    } catch (error) {
        throw new appError("Server Error",500)
    }

    if(!result.rows || result.rows.length===0){
        throw new notFoundError("No Data Found");
    }


    res.status(200).json({
        "success":true,
        "count":result.rows.length,
        "data":result.rows
    })

})


export const createToDo=asyncHandler(async(req,res)=>{
  
    const {description,is_completed}=req.body;

    if(!description || typeof description!== "string" || description.trim()===""){
        throw new validationError("Description is Required")
    }
  let newData;
    try {

        // make practice for define the values put as seperate
        // bcs it can be vulnerable by SQL injection
        // like INSERT INTO todo VALUES(description=$1,is_completed=$2; DROP DATABASE to_do_app ; --)
        newData=await pool.query("INSERT INTO todo(description,is_completed) VALUES($1,$2) RETURNING *",[description,is_completed])

    } catch (error) {
        console.error("DB error in creating todo")
        throw new appError("Server Error",500)
    }

res.status(201).json({
    "success":true,
    "data":newData.rows[0]
})
})







