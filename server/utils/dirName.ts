import { fileURLToPath } from "node:url";
import path from "node:path";


export const dirName=(url:string)=>{

const __filename=fileURLToPath(url);
return path.dirname(__filename);

}





