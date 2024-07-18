import request  from "supertest";
import server from "../../server";


describe('POST  /api/products', () => {


    test('shoud display validation errors', async() => {
        const response = await request(server).post('/api/products')

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);

        expect(response.statusCode).not.toEqual(201);
        expect(response.statusCode).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(0);

    });



    test('should create a new product', async() => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse Testing",
            price: 100
          })

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('data');

        expect(response.statusCode).not.toBe(200);
        expect(response.statusCode).not.toBe(404);
        expect(response.body).not.toHaveProperty('errors');
    });

    test('shoud validate that the price is greater than 0', async() => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse Testing",
            price: 0
  
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);

        expect(response.statusCode).not.toEqual(201);
        expect(response.statusCode).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(0);

    });

    test('shoud validate that the price is a number and greater than 0', async() => {
        const response = await request(server).post('/api/products').send({
            name: "Mouse Testing",
            price: "hola"
  
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(2);

        expect(response.statusCode).not.toEqual(201);
        expect(response.statusCode).not.toEqual(404);
        expect(response.body.errors).not.toHaveLength(0);

    });
});


describe('GET  /api/products', () => {


    test('should checkt that if api/url exits', async() => {
        const response = await request(server).get('/api/products')
        expect(response.statusCode).not.toEqual(404);
    });
    
    test('GET a JSON response with products', async() => {
        const response = await request(server).get('/api/products')
        
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toMatch('application/json');
        expect(response.body).toHaveProperty('data');
        expect(response.body.data).toBeInstanceOf(Array);
        // expect(response.body.data).toHaveLength(1)

        // console.log(response.body.data)
        
        expect(response.body).not.toHaveProperty('errors');
        expect(response.statusCode).not.toBe(400);
    });
});

describe('GET /api/products/:id', () => {

    test('Should return a 404 response for a non-existent product', async() => {
        const productId = 200;
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error');
        expect(response.body.error).toBe('Producto no encontrado');
    });

    test('Should check a valid ID in the URL', async() => {
        const response = await request(server).get(`/api/products/hola`);
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors'); 
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Id no valido');
    });

    test('GET A JSON response for a single product ', async() => {
        const response = await request(server).get(`/api/products/1`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data'); 
    });
    
});


describe('PUT /api/products/:id', () => {

    test('Should check a valid ID in the URL', async() => {
        const response = await request(server)
                                .get(`/api/products/hola`)
                                .send({
                                    name: "Montor curvo x2",
                                    price: 100,
                                    availability: false
                                })
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors'); 
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Id no valido');
    });

    test('Should check throw a error if not exist a product ID', async() => {
        const response = await request(server)
                                .put(`/api/products/3256`)
                                .send({
                                    name: "Montor curvo x2",
                                    price: 100,
                                    availability: false
                                })
        expect(response.statusCode).toBe(404);
        expect(response.body).toHaveProperty('error'); 
        expect(response.body.error).toBe('Producto no encontrado');
    });
    
    test('Should display valitacion error messages when updating a product', async() => {
        const response = await request(server).put('/api/products/1').send()

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(4);


        expect(response.statusCode).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('Should validate that the price is greater than 0', async() => {
        const response = await request(server)
                    .put('/api/products/1')
                    .send({
                        name: "Montor curvo x2",
                        price: -100,
                        availability: false
                    
                        }
                    )

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors).toHaveLength(1);
        expect(response.body.errors[0].msg).toBe('Precio no valido')


        expect(response.statusCode).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('Should update an existing product with valid data', async() => {
        const response = await request(server)
                                .put(`/api/products/1`)
                                .send({
                                    name: "Montor curvo x2",
                                    price: 100,
                                    availability: false
                                })
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data'); 
        
        expect(response.statusCode).not.toBe(400);
        expect(response.body).not.toHaveProperty('errors'); 
    });
});

describe('PATCH /api/products/:id', () => {
    
    test('should return 404 response for a non-existing product', async() => {
        const response = await request(server).patch('/api/products/515');

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado');

        expect(response.statusCode).not.toBe(200);
        expect(response.body).not.toHaveProperty('data');
    });

    test('Should update the product availibily', async() => {
        const response = await request(server).patch('/api/products/1');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('data');
        // console.log(response.body.data)
        expect(response.body.data.availability).toBeFalsy();
    
        expect(response.statusCode).not.toBe(400);
        expect(response.statusCode).not.toBe(404);
        expect(response.body).not.toHaveProperty('error');
    });
});



describe('DELETE api/products/:id', () => {
    
    test('Should check a ID valid ', async() => {
        const response = await request(server).delete('/api/products/not-valid');

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('errors');
        expect(response.body.errors[0].msg).toBe('Id no valido');

        expect( response.statusCode).not.toBe(200);
        expect( response.statusCode).not.toBe(404);

    });

    test('Should return 404 response dor a non-existent product', async() => {
        const productId = 2000
        const response = await request(server).delete(`/api/products/${productId}`);

        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Producto no encontrado')

        expect( response.statusCode).not.toBe(400);
        expect( response.statusCode).not.toBe(200);
    });

    test('Should Delete product', async() => {
        const productId = 1
        const response = await request(server).delete(`/api/products/${productId}`);

        expect( response.statusCode).toBe(200);
        expect( response.body.data).toBe(`Producto #${productId} eliminado`);

        expect( response.statusCode).not.toBe(400);
        expect( response.statusCode).not.toBe(404);
    });
});