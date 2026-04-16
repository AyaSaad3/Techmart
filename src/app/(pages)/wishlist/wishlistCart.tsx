"use client";

import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { WishlistResponse } from "@/interfaces/wishlist/WishlistResponse";
import apiServices from "@/services/api";
import { useState } from "react";
import Link from "next/link";

export default function WishlistCart({ product }: { product: WishlistResponse }) {

    const [cart, setCart] = useState<WishlistResponse>(product);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    async function removeProduct(productId: string) {
            setIsDeleting(productId)
            await apiServices.removeProductFromWishlist(productId)
            setCart((prev) => ({
                ...prev,
                count: prev.count - 1,
                data: prev.data.filter((item) => item._id !== productId),
            }))
            setIsDeleting(null)
    }      

    if (cart.count == 0) {
        return (
            <section className="py-11">
                <div className="container max-w-lg text-center">
                    <h1 className="mb-4 text-2xl font-semibold">Your wishlist is empty</h1>
                    <p className="mb-8 text-muted-foreground">
                        Browse products and save your favorites here.
                    </p>
                    <Button asChild className="bg-indigo-600 p-5 text-md [a]:hover:bg-indigo-700">
                        <Link href="/">Browse Products</Link>
                    </Button>
                </div>
            </section>
        );
    }

    return (
        <div className="container mx-auto px-4">
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-gray-900">Saved Items</h1>
                <p className="mt-2 text-md text-gray-500">
                    {cart.count} items in your wishlist
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white">
                {cart.data.map((item) => (
                    <div
                        key={item._id}
                        className=" p-5"
                    >
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                            <div className="flex flex-1 flex-col gap-4 sm:flex-row sm:items-start">
                                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                                    <img
                                        src={item.imageCover}
                                        alt={item.title}
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        {item.title}
                                    </h2>
                                    <p className="text-sm text-gray-500">
                                        {item.category?.name}
                                    </p>

                                    <div className="mt-2 flex items-center gap-3">
                                        <span className="text-lg font-semibold text-gray-900">
                                            {formatPrice(item.price)}
                                        </span>

                                        <span className="text-lg text-gray-400 line-through">
                                            {formatPrice(item.price + 100)}
                                        </span>

                                        {item.quantity == 0 && (
                                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col items-end justify-between gap-4">
                                <button
                                    onClick={() => removeProduct(item._id)}
                                    disabled={isDeleting === item._id}
                                    className="rounded-full p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-500"
                                >
                                    {isDeleting === item._id
                                        ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 me-1"></div>
                                        : <Trash2 size={18} />
                                    }
                                </button>

                                <Button
                                    disabled={item.quantity == 0}
                                    className={`min-w-30 rounded-lg px-5 py-5 text-md ${item.quantity == 0
                                        ? "bg-gray-400 hover:bg-gray-400"
                                        : "bg-black hover:bg-gray-800"
                                        }`}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" />
                                    {item.quantity == 0 ? "Sold Out" : "Add to Cart"}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
