declare global{
    namespace NodeJS{
        interface ProcessEnv{
            DB_HOST:string,
            DB_PORT?:string,
            DB_USER:string,
            DB_PASWWORD:string,
            DB_NAME:string
        }
    }
}


export {}



