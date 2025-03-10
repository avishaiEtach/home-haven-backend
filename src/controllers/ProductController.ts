import express from "express";
import { utilsFunctions } from "../utils/utilsFunctions";
import { ProductModel } from "../db/models/product";

class ProductsController {
  getProducts = async (req: express.Request, res: express.Response) => {
    try {
      const { filter, sort, page, limit } = req.body;
      const { originOfManufacture, price, categories } = filter;
      let query: any = {};
      if (originOfManufacture?.length) {
        const regx = new RegExp(originOfManufacture.join("|"), "i");
        query["productDetails.originOfManufacture"] = regx;
      }
      const defaultPrice = [
        Number(process.env.DEFAULT_PRICE_MIN),
        Number(process.env.DEFAULT_PRICE_MAX),
      ];
      if (categories?.length) {
        const regx = new RegExp(categories.join("|"), "i");
        query = {
          ...query,
          $or: [{ productName: regx }, { shortName: regx }],
        };
      }

      if (Array.isArray(price) && price.length) {
        if (price[0] !== defaultPrice[0] || price[1] !== defaultPrice[1]) {
          query.price = { $gte: price[0], $lte: price[1] };
        }
      }

      const products = await ProductModel.find(query).sort(sort);

      return res
        .status(200)
        .json(utilsFunctions.getPagination(page, limit, products));
    } catch (err: any) {
      return res.status(401).send(err.message);
    }
  };

  getProductById = async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }
      return res.status(200).json(product);
    } catch (err: any) {
      return res.status(400).send(err.message);
    }
  };

  createProduct = async (req: express.Request, res: express.Response) => {
    try {
      const { product } = req.body;
      const newProduct = new ProductModel(product);
      await newProduct.save();
      return res.status(200).json(newProduct);
    } catch (err: any) {
      return res.status(401).send(err.message);
    }
  };
}

export default new ProductsController();
