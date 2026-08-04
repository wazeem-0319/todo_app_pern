import { appError } from "./appError.js";

export class unAuthorizedError extends appError{
    constructor(message:string="Unauthorized"){
        super(message,401)
    }
}


