import { Request, Response } from 'express'
import Product from '../models/Product.model'

export const createProduct = async (req: Request, res: Response) => {
    console.time("A-Start");
    console.time("B-Validation");
    console.time("C-DB");

    try {
        console.timeEnd("A-Start");

        // Your validation
        console.timeEnd("B-Validation");

        const product = await Product.create(req.body);
        console.timeEnd("C-DB");

        res.status(201).json(product);
    } catch (error) {
        console.error(error);
    }
}

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        });
        res.status(200).json({ data: products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching products '});
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
           return res.status(404).json({ error: 'Product not found'} );
        }

        res.status(200).json({ data: product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error fetching product' });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
           return res.status(404).json({ error: 'Product not found'} );
        }

        await product.update(req.body);
        const updatedProduct = await product.save();
        res.status(200).json({ data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error updating product' });
    }
}

export const updateAvailability = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
           return res.status(404).json({ error: 'Product not found'} );
        }

        product.availability = !product.dataValues.availability;
        const updatedProduct = await product.save();
        res.status(200).json({ data: updatedProduct });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error updating product availability' });
    }
}

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id);

        if (!product) {
           return res.status(404).json({ error: 'Product not found'} );
        }

        await product.destroy();
        res.status(200).json({ data: 'Product deleted' });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error updating product availability' });
    }
}