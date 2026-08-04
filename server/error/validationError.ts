import { appError } from "./appError.js";

export class validationError extends appError{
    constructor(message:string){
        super(message,400)

    }
}



