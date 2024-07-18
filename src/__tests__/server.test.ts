import db from "../config/db";
import { connectDB } from "../server";


jest.mock('../config/db')

describe('ConnectDb', () => {
    test('Should handle database connection error', async() => {
       jest.spyOn(db, 'authenticate')
        .mockRejectedValueOnce(new Error('Hubo un error a conectar a la base de datos'))

        const consoleSypy = jest.spyOn(console, 'log');

        await connectDB();

        expect(consoleSypy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error a conectar a la base de datos'
            ));
    });
});