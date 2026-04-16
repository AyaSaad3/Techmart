import { IProduct } from "../product/IProduct";

export interface WishlistResponse {
    status: string;
    count: number;
    data: IProduct[];
}