/*se encarga de cargar los usuarios a la base de datos*/

import path from 'path'; // para mostrar la ruta actual
import fs from 'fs'; //lector de archivos de js
import csv from 'csv-parser';
import { pool } from '../conexion_db.js';

export async function cargarLibrosBd() {
  const rutaArchivo = path.resolve("server/data/03_libros.csv");

  const autores = []; // donde se van  a guardar lo usuarios

  return new Promise((resolve, reject) => {
    fs.createReadStream(rutaArchivo)
  .pipe(csv({
    mapHeaders: ({ header }) => header.trim() // quita espacios de cabeceras
  }))
  .on('data', (fila) => {
    autores.push([
      (fila.isbn_libro || '').trim(),
      (fila.titulo_libro || '').trim(),
      (fila.ano_publicacion || '').trim(),
      (fila.autor || '').trim()
    ]);
  })
  .on('end', async () => {
    try {
      const sql = 'INSERT INTO usuarios (nombre_autor) VALUES ?';
      const [result] = await pool.query(sql, [usuarios]);
      console.log(`Se insertaron correctamente los registros ${result.affectedRows} autores.`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });

  });
}
