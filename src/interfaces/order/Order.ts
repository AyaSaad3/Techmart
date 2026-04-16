import { OrderCartItem } from "./OrderCartItem";
import { OrderUser } from "./OrderUser";
import { ShippingAddress } from "./ShippingAddress";

export interface Order {
    shippingAddress: ShippingAddress;
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: OrderUser;
    cartItems: OrderCartItem[];
    paidAt: string;
    createdAt: string;
    updatedAt: string;
    id: number;
    __v: number;
}