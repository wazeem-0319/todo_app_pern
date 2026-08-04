import path from "node:path"
import {dirName} from "../utils/dirName.js"
import dotenv from "dotenv"


console.log(dirName(import.meta.url))
console.log(path.resolve(dirName(import.meta.url),"../.env"))

const setEnv=dotenv.config({
    path:path.resolve(dirName(import.meta.url),"../.env")
})

export {setEnv}


