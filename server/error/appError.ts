export class appError extends Error{

    public readonly statusCode:number;
    public readonly isOperational:boolean;

    constructor(message:string,statusCode:number){
        super(message)
        this.statusCode=statusCode;
        this.isOperational=true;

        // maintains correct prototype chain (needed when extending built-ins in TS)
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }



}








