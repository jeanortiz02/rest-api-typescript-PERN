import { Response, Request } from "express"
import Product from "../models/Product.model"


export const getProduct = async (req: Request, res: Response) => {

    const product = await Product.findAll({
        order: [
            ['price', 'DESC']
        ]
    })
    res.json({data: product})
}

export const getProductById = async (req: Request, res: Response) => {

    // Validando que el producto exista
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    res.json({data: product})
}

export const createProduct = async(req : Request, res : Response) => {
    // Inserta datos a la base de datos
    const product = await Product.create(req.body);
        res.status(201).json({data: product})
}

export const updatedProduct = async(req : Request, res: Response) => {
    // Validando que el producto exista
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    // Actualiza los datos del producto
    await product.update(req.body);
    await product.save();

    res.json({data: product})
}


export const updatedAvailability = async(req : Request, res: Response) => {
    // Validando que el producto exista
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    // Actualizar y guardar los datos
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async(req : Request, res: Response) => {
    // Validando que el producto exista
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' })
    }

    // Eliminar product
    await product.destroy();

    res.json({data: `Producto #${id} eliminado`})
}