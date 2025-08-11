/*llama  a los loads*/

import { cargraAutoresBd } from "./load_autores.js";
import { cargraUsuariosBd } from "./load_usuarios.js"

debugger

(async ()=>{
    try {
        console.log("inciando seeders")
        await cargraUsuariosBd()
        await cargraAutoresBd()
    } catch (error) {
        console.error('error al ejecutar los seeders',error.message)
    } finally{
        process.exit();
    }
}) (); // esto es una funcion recursiva las cuales son funciones que se ejecutan por si solas