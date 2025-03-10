import mongoose from "mongoose";
import { Product } from "../../types/globalTypes";

const ProductGeneralSchema = new mongoose.Schema({
  salesPackage: { type: String, required: true },
  modelNumber: { type: String, required: true },
  secondaryMaterial: { type: String, required: true },
  configuration: { type: String, required: true },
  upholsteryMaterial: { type: String, required: true },
  upholsteryColor: { type: String, required: true },
});

const ProductDetailsSchema = new mongoose.Schema({
  fillingMaterial: { type: String, required: true },
  finishType: { type: String, required: true },
  adjustableHeadrest: { type: Boolean, required: true },
  maximumLoadCapacity: { type: Number, required: true },
  originOfManufacture: { type: String, required: true },
  productDescription: { type: String, required: true, default: "" },
  colors: { type: [String], required: true, default: [] },
  productFullDescription: { type: String, required: true, default: "" },
});

const ProductDimensionsSchema = new mongoose.Schema({
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  depth: { type: Number, required: true },
  weight: { type: Number, required: true },
  seatHeight: { type: Number, required: true },
  legHeight: { type: Number, required: true },
});

const ProductWarrantySchema = new mongoose.Schema({
  warrantySummary: { type: String, required: true },
  warrantyServiceType: { type: String, required: true },
  coveredInWarranty: { type: String, required: true },
  notCoveredInWarranty: { type: String, required: true },
  domesticWarranty: { type: String, required: true },
});

export const ProductSchema = new mongoose.Schema<Product>(
  {
    productName: { type: String, required: true },
    shortName: { type: String, required: true },
    mainImage: { type: String, required: true },
    productImages: {
      type: Map,
      of: [String],
      required: true,
    },
    price: { type: Number, required: true },
    rating: { type: Number, required: true },
    discount: { type: Number, required: true },
    general: { type: ProductGeneralSchema, required: true },
    productDetails: { type: ProductDetailsSchema, required: true },
    dimensions: { type: ProductDimensionsSchema, required: true },
    warranty: { type: ProductWarrantySchema, required: true },
  },
  {
    timestamps: true,
  }
);

export const ProductModel = mongoose.model("Product", ProductSchema);
