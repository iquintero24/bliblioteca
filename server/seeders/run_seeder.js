/*llama  a los loads*/

import { cargarAutoresBd } from "./load_autores.js";
import { cargarLibrosBd } from "./load_libros.js";
import { cargraUsuariosBd } from "./load_usuarios.js"



(async ()=>{
    try {
        console.log("inciando seeders")
        await cargraUsuariosBd()
        await cargarAutoresBd()
        await cargarLibrosBd()
        


    } catch (error) {
        console.error('error al ejecutar los seeders',error.message)
    } finally{
        process.exit();
    }
}) (); // esto es una funcion recursiva las cuales son funciones que se ejecutan por si solas