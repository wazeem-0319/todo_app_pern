import {Pool} from "pg"

const pool=new Pool({
host:process.env.DB_HOST,
port:Number(process.env.DB_PORT) || 5432,
user:process.env.DB_USER,
password:process.env.DB_PASSWORD,
database:process.env.DB_NAME
})

// const pool=new Pool({
// host:"localhost",
// port:5432,
// user:"postgres",
// password:"sm0319",
// database:"todo_app"
// })

export {pool}



