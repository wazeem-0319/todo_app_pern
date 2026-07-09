import {Pool} from "pg";

const pool= new Pool({
    user:"postgres",
    password:"sm0319",
    host:"localhost",
    port:5432,
    database:"todo_app"
})

export default pool