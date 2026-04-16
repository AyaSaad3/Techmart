import { IBrand } from "./IBrand";
import { ICategory } from "./ICategory";
import { ISubCategory } from "./ISubCategory";

export interface IProduct {
    sold: number;
    images: string[];
    subcategory: ISubCategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    slug: string;
    description: string;
    quantity: number;
    price: number;
    imageCover: string;
    category: ICategory;
    brand: IBrand;
    ratingsAverage: number;
    createdAt: string;   
    updatedAt: string; 
    id: string;
}