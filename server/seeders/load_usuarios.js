/*se encarga de cargar los usuarios a la base de datos*/

import path from 'path'; // para mostrar la ruta actual
import fs from 'fs'; //lector de archivos de js
import csv from 'csv-parser';
import { pool } from '../conexion_db.js';


export async function cargraUsuariosBd() {
  const rutaArchivo = path.resolve("server/data/01_usuarios.csv");

  const usuarios = []; // donde se van  a guardar lo usuarios

  return new Promise((resolve, reject) => {
    fs.createReadStream(rutaArchivo)
  .pipe(csv({
    mapHeaders: ({ header }) => header.trim() // quita espacios de cabeceras
  }))
  .on('data', (fila) => {
    usuarios.push([
      (fila.nombre_completo || '').trim(),
      (fila.identificacion_usuario || '').trim(),
      (fila.correo_usuario || '').trim(),
      (fila.telefono_usuario || '').trim()
    ]);
  })
  .on('end', async () => {
    try {
      const sql = 'INSERT INTO usuarios (nombre_completo,identificacion_usuario,correo_usuario,telefono_usuario) VALUES ?';
      const [result] = await pool.query(sql, [usuarios]);
      console.log(`Se insertaron correctamente los registros ${result.affectedRows} autores.`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

  });
}
