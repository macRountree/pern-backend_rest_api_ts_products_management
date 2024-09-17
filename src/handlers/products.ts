import {Request, Response} from 'express';
import Product from '../models/Product.model.js';
export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      order: [['price', 'DESC']],
      attributes: {exclude: ['createdAt', 'updatedAt']},
    }); //*Order by id in descending order
    res.json({data: products});
  } catch (error) {
    console.log(error);
  }
};
export const getProductById = async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const {id} = req.params;

    const productId = await Product.findByPk(id);

    if (!productId) {
      return res.status(404).json({error: 'Product not found'});
    }
    res.json({data: productId});
  } catch (error) {
    console.log(error);
  }
};
export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.create(req.body);
    res.json({data: product});
  } catch (error) {
    console.log(error);
  }
};
export const updateProduct = async (req: Request, res: Response) => {
  //*Check if the product exists
  const {id} = req.params;

  const productId = await Product.findByPk(id);

  if (!productId) {
    return res.status(404).json({error: 'Product not found'});
  }

  //*update only changes partial modifications
  await productId.update(req.body);
  await productId.save();
  res.json({data: productId});
};

export const uptadeAvailability = async (req: Request, res: Response) => {
  const {id} = req.params;

  const productId = await Product.findByPk(id);
  if (!productId) {
    return res.status(404).json({error: 'Product not found'});
  }
  productId.availability = !productId.dataValues.availability;
  await productId.save();
  res.json({data: productId});
};
export const deleteProduct = async (req: Request, res: Response) => {
  const {id} = req.params;

  const productId = await Product.findByPk(id);
  if (!productId) {
    return res.status(404).json({error: 'Product not found'});
  }
  await productId.destroy();
  res.json({data: 'Product deleted'});
};
