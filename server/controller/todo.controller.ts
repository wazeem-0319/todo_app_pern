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


export const updateToDo=asyncHandler(async(req,res)=>{
    const {_id}=req.params
    const {description,is_completed}=req.body

    if (typeof _id !== "string" || !_id || _id.trim()==="" || isNaN(Number(_id))){
        throw new validationError("Invalid ID number")
    }

    const id=Number(_id)

    if(description===undefined && is_completed===undefined){
        throw new validationError("At least one field must be define (Description or is_completed")
    }

    if(description!==undefined && description.trim()===""){
        throw new validationError("validation cann't be empty")
    }

    let updateData;


    try {
        updateData=await pool.query("UPDATE todo SET description=COALESCE($1,description),is_completed=COALESCE($2,is_completed) WHERE _id=$3 RETURNING *",[description,is_completed,id])
    } catch (error) {
        throw new appError("Server Error",500)
    }

    if(updateData.rowCount===0){
        throw new appError("Todo not Found",404)
    }

    return res.status(200).json({
        "success":true,
        "data":updateData.rows[0]
    })

})



export const deleteTodo=asyncHandler(async(req,res)=>{
    const {_id}=req.params


    if(!_id || isNaN(Number(_id))){
        throw new validationError("the ID should be a Number")
    }

    let deleteData;
    const id=Number(_id)
    try {
        deleteData=await pool.query("DELETE FROM todo WHERE _id=$1 RETURNING *",[id])
    } catch (error) {
        throw new appError("Server Error",500)
    }

    if(deleteData.rowCount===0){
        throw new appError("Todo not Found",404)
    }

    return res.status(200).json({
        "success":true,
        "data":deleteData.rows[0]
    })

}) 


export const getData=asyncHandler(async(req,res)=>{

const {_id}=req.params

if(!_id || isNaN(Number(_id))){
    throw new validationError("The ID should be a Number")
}

const id=Number(_id)
let data;

try {
    data=await pool.query("SELECT * FROM todo WHERE _id=$1",[id])
} catch (error) {
    throw new appError("Server Error",500)
}
if(data.rowCount===0){
    throw new appError("Todo not Found",404)
}

return res.status(200).json({
    "success":true,
    "data":data.rows[0]
})


})













