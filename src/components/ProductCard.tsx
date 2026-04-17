"use client";
import { cartContext } from '@/contexts/cartContext';
import { StarRating } from '@/helpers/renderStars';
import { IProduct } from '@/interfaces/product/IProduct';
import { formatPrice } from '@/lib/utils';
import apiServices from '@/services/api';
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useContext, useState } from 'react';
import { toast } from 'sonner';

export default function ProductCard({ product }: { product: IProduct }) {

    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState<string | null>(null);

    const { setCartCount } = useContext(cartContext);

    const session = useSession()
    const token = session.data?.user.token  

    const handleAddToCart = async () => {
        setIsLoading(true);
        const response = await apiServices.addProductToCart(product._id, token?? "");
        setCartCount(response.numOfCartItems);
        toast.success(response.message, {
            style: {
                color: 'green',
            }
        })
        setIsLoading(false);
    }

    async function addToWishlist() {
        setIsAdding(product._id)
        await apiServices.addProductToWishlist(product._id, token ?? "");
        setIsFavorite(!isFavorite)
        setIsAdding(null)
    }

    return (
        <div className="group bg-white border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative overflow-hidden">
                <img className="m-auto h-60 object-cover group-hover:scale-110 transition-transform duration-500" src={product.imageCover} alt={product.title} width={240} height={240} />

                <div className="absolute top-1/2 -translate-y-1/2 right-2 flex flex-col gap-3 opacity-0 translate-x-5 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                    <button onClick={addToWishlist} disabled={isAdding == product._id} className={`bg-white p-2 rounded-full shadow ${isAdding == product._id ? "" : "hover:bg-indigo-500 hover:text-white transition"} hover:text-white transition ${isFavorite ? 'text-red-500' : 'text-gray-500'}`}>
                        {isAdding == product._id ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500"></div>
                        ) : (
                                <Heart size={16} fill={isFavorite ? "red" : "none"} />
                        )}
                    </button>

                    <button
                        onClick={handleAddToCart}
                        disabled={isLoading}
                        className={`bg-white p-2 rounded-full shadow ${isLoading ? "" : "hover:bg-indigo-500 hover:text-white transition"} `}
                    >
                        {isLoading ? (
                            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500"></div>
                        ) : (
                            <ShoppingCart size={16} />
                        )}
                    </button>

                    <Link href={"/products/" + product._id} className="bg-white p-2 rounded-full shadow hover:bg-indigo-500 hover:text-white transition">
                        <Eye size={16} />
                    </Link>
                </div>
            </div>

            <div className="p-4">
                {/* Category */}
                <p className="text-gray-400 text-sm mb-1">
                    {product.category.name}
                </p>

                {/* Title */}
                <Link href="#" className="font-semibold text-gray-800 text-lg line-clamp-2 mb-1">
                    {product.title}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-3 text-lg mb-1">
                    <StarRating rating={product.ratingsAverage} />
                    <span className="text-gray-400 text-sm">{product.ratingsAverage} ({product.ratingsQuantity})</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                    <span className="text-indigo-500 font-bold">
                        {formatPrice(product.price)}
                    </span>

                    <span className="text-gray-400 line-through text-sm">
                        {formatPrice(product.price + 100)}
                    </span>
                </div>
            </div>
        </div>
    )
}
