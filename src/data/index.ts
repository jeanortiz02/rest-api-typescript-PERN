import { exit } from "process";
import db from "../config/db";


const clearDb = async () => {
    try {
        await db.sync({force: true});
        console.log('Base de datos limpiada');
        exit(0);
    } catch (error) {
        console.log(error);
        exit(1);
    }
}

if (process.argv[2] === '--clear') {
    clearDb();
}
