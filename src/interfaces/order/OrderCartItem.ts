import { IBrand } from "../product/IBrand";
import { ICategory } from "../product/ICategory";
import { ISubCategory } from "../product/ISubCategory";


export interface OrderCartItem {
    count: number;
    _id: string;
    product: OrderProduct;
    price: number;
}

export interface OrderProduct {
    subcategory: ISubCategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: ICategory;
    brand: IBrand;
    ratingsAverage: number;
    id: string;
}