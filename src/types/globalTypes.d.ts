import { Request } from "express";

interface Product {
  productName: string;
  shortName: string;
  mainImage: string;
  productImages: { [key: string]: string[] };
  price: number;
  rating: number;
  discount: number;
  general: ProductGeneral;
  productDetails: ProductDetails;
  dimensions: ProductDimensions;
  warranty: ProductWarranty;
}

interface ProductGeneral {
  salesPackage: string;
  modelNumber: string;
  secondaryMaterial: string;
  configuration: string;
  upholsteryMaterial: string;
  upholsteryColor: string;
}

interface ProductDetails {
  fillingMaterial: string;
  finishType: string;
  adjustableHeadrest: boolean;
  maximumLoadCapacity: number;
  originOfManufacture: string;
  productDescription: string;
  colors: string[];
  productFullDescription: string;
}

interface ProductDimensions {
  width: number;
  height: number;
  depth: number;
  weight: number;
  seatHeight: number;
  legHeight: number;
}

interface ProductWarranty {
  warrantySummary: string;
  warrantyServiceType: string;
  coveredInWarranty: string;
  notCoveredInWarranty: string;
  domesticWarranty: string;
}

interface Review {
  user: string;
  productId: mongoose.Types.ObjectId;
  rating: number;
  comment: string;
  date: string;
}

export { Product, Review };
