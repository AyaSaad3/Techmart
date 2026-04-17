"use client";

import { ArrowLeft, ShoppingCart as ShoppingCartIcon, Trash2 } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AddToCartResponse } from "@/interfaces/cart/AddToCartResponse";
import { formatPrice } from "@/lib/utils";
import apiServices from "@/services/api";
import Link from "next/link";
import CartProduct from "@/components/CartProduct";
import { cartContext } from "@/contexts/cartContext";
import { useSession } from "next-auth/react";

const ShoppingCart = ({ cart }: { cart: AddToCartResponse }) => {

    const [innerCart, setInnerCart] = useState<AddToCartResponse>(cart);
    const [isClearing, setIsClearing] = useState(false);
    const { setCartCount } = useContext(cartContext);

    const session = useSession()
    const token = session.data?.user.token  

    useEffect(() => {
        setCartCount(innerCart.numOfCartItems);
    }, [innerCart])

    async function removeItem(productId: string) {
        const response = await apiServices.removeProductFromCart(productId, token?? "");
        setInnerCart(response);
    }

    async function clearCart() {
        setIsClearing(true);
        const response = await apiServices.clearCart(token?? "");
        setInnerCart(response);
        setIsClearing(false);
    }

    async function updateProductCount(productId: string, count: number) {
        const response = await apiServices.updateProductCount(productId, count, token?? "");
        setInnerCart(response);
    }

    if (innerCart.numOfCartItems === 0) {
        return (
            <section className="py-18">
                <div className="container max-w-lg text-center">
                    <h1 className="mb-4 text-2xl font-semibold">Your cart is empty</h1>
                    <p className="mb-8 text-muted-foreground">
                        Looks like you have not added anything yet.
                    </p>
                    <Button asChild className="bg-indigo-600 p-5 text-md [a]:hover:bg-indigo-700">
                        <Link href="/products">Continue Shopping</Link>
                    </Button>
                </div>
            </section>
        );
    }
    
    return (
        <section className="py-18">
            <div className="container">
                <h1 className=" text-3xl font-semibold">Shopping Cart</h1>
                <p className="text-gray-600 mt-2 mb-4">You have <span className="font-semibold text-gray-700">{innerCart.numOfCartItems} {innerCart.numOfCartItems == 1 ? "item" : "items"}</span> in your cart</p>

                <div className="flex gap-140 mb-2">
                    <Button
                        className="bg-transparent text-indigo-500 hover:text-indigo-700"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <Link href="/products">Continue Shopping</Link>
                    </Button>

                    <Button
                        className="bg-transparent text-gray-500 hover:text-red-600"
                        onClick={clearCart}
                        disabled={isClearing}
                    >
                        {isClearing ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-ring me-1"></div>
                        ) : (
                            <Trash2 className="w-4 h-4" />
                        )}
                        Clear all items
                    </Button>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {innerCart.data.products.map((item) => (
                                <CartProduct key={item._id} item={item} removeItem={removeItem} updateProductCount={updateProductCount} />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-lg border bg-card p-6">
                            <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>

                            <div className="space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-1.5 text-muted-foreground">
                                        <ShoppingCartIcon className="size-4" />
                                        {innerCart.numOfCartItems} {innerCart.numOfCartItems === 1 ? "item" : "items"}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span>{formatPrice(innerCart.data.totalCartPrice)}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Shipping</span>
                                    <span>{formatPrice(0)}</span>
                                </div>

                                <Separator />

                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>{formatPrice(innerCart.data.totalCartPrice)}</span>
                                </div>
                            </div>

                            <Button size="lg" className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700">
                                <Link href="/checkout">
                                        <span>Proceed to Checkout</span>
                                    </Link>
                            </Button>

                            <p className="mt-4 text-center text-xs text-muted-foreground">
                                Taxes calculated at checkout
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export { ShoppingCart };
