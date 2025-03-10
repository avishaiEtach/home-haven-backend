import mongoose from "mongoose";
import { Product } from "../../types/globalTypes";
import { ProductSchema } from "./product";

const CartItemSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  productCount: { type: Number, required: true },
  productImage: { type: String, required: true },
  productPrice: { type: Number, required: true },
});

const TokenSchema = new mongoose.Schema<{
  token: string;
  cart: {
    [key: string]: {
      productName: string;
      productCount: number;
      productImage: string;
      productPrice: number;
    };
  };
  favorite: { [key: string]: Product };
  compare: string[];
}>(
  {
    token: {
      type: String,
      required: true,
      unique: true,
    },
    cart: {
      type: Map,
      of: CartItemSchema, // Each cart item follows the CartItemSchema
      default: {}, // Default to an empty cart
    },
    favorite: {
      type: Map,
      of: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, // Each cart item follows the CartItemSchema
      default: {}, // Default to an empty cart
    },
    compare: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const TokenModel = mongoose.model("Token", TokenSchema);
