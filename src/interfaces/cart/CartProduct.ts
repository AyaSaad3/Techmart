import { IBrand } from "../IBrand";
import { ICategory } from "../ICategory";
import { ISubCategory } from "../ISubCategory";

export interface CartProduct {
    count: number;
    _id: string;
    product: Product;
    price: number;
}

interface Product {
    _id: string;
    id: string;
    title: string;
    quantity: number;
    imageCover: string;
    subcategory: ISubCategory[];
    category: ICategory;
    brand: IBrand;
    ratingsAverage: number;
}
