import mysql from "mysql2/promise"; // se importa la libreria como una promesa}
import dotenv from "dotenv"; // libreria para poder llamar las variales de entorno

dotenv.config(); // Cargar variables de .env

// se crea una pool para hacer una conexion con la base de datos
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,

  connectionLimit: 10, // Máximo número de conexiones activas al mismo tiempo
  waitForConnections: true, // Si se alcanza el límite, las nuevas peticiones esperan su turno
  queueLimit: 0, // Número máximo de peticiones en espera (0 = sin límite)
}); 

async function probarConexionBaseDatos() {
    try {
        const conection = await pool.getConnection();
        console.log('conexion a la bd exitosa');
        conection.release();
    } catch (error) {
        console.error('error al conectrase a la base de datos', error.message)
    }
}

