import express from "express";
import  swaggerUi  from "swagger-ui-express";
import router from "./router";
import db from "./config/db";
import colors from "colors";
import cors, { CorsOptions }  from 'cors'
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import morgan from "morgan";

// Conection to DB 
export async function connectDB() {

    try {
        await db.authenticate();
        await db.sync()
        // console.log( colors.bgBlue.bold('Conectado a la base de datos'))
    } catch (error) {
        console.log(error);
        console.log( colors.bgRed.white( 'Hubo un error a conectar a la base de datos'))
    }
}

connectDB();

// Instancia de express 
const server = express();

// Permitir conexiones 
const corsOptions : CorsOptions = {
    origin: function( origin, callback) {
        if ( origin === process.env.FRONTEND_URL) {
           callback(null, true);
        } else {
            callback(new Error('Error de cors'), false);
        }
    }
}

server.use(cors(corsOptions))

// Leer datos de formularios
server.use(express.json());

server.use(morgan('dev'))
server.use( '/api/products', router);


// Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server;