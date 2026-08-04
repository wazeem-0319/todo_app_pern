import { appError } from "./appError.js";

export class notFoundError extends appError{

    constructor(message:string="Resource"){
        super(`${message} not found`,404)
    }

}



