"use client";

import { useContext, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StarRating } from '@/helpers/renderStars';
import { Heart } from 'lucide-react';
import ProductCard from './ProductCard';
import apiServices from '@/services/api';
import { toast } from "sonner"
import { formatPrice } from '@/lib/utils';
import { cartContext } from '@/contexts/cartContext';
import { IProduct } from '@/interfaces/product/IProduct';

export default function ProductDetails({ product, products }: { product: IProduct; products: IProduct[] }) {
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isAdding, setIsAdding] = useState(false);

    const { setCartCount } = useContext(cartContext);
 
    async function addToCart() {
        setIsLoading(true);
        const response = await apiServices.addProductToCart(product._id);
        setCartCount(response.numOfCartItems);
        setIsLoading(false);
        
        toast.success(response.message, {
            style: {
                color: 'green',
            }
        })
    }

    async function addToWishlist() {
        setIsAdding(true)
        await apiServices.addProductToWishlist(product._id);
        setIsWishlisted(!isWishlisted)
        setIsAdding(false)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <nav className="text-sm text-gray-500 mb-6">
                <ul className='flex gap-1'>
                    <li className='text-black'><Link href='/'>Home /</Link></li>
                    <li className='text-black'><Link href='/products'>Shop /</Link></li>
                    <li className='text-black'><Link href={`/categories/${product.category.slug}`}>{product.category.name} /</Link></li>
                    <li>{product.title}</li>
                </ul>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Left Side - Images */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <div className="h-130 w-[96%] relative aspect-square bg-gray-100 rounded-lg overflow-hidden border">
                        <Image
                            src={product.images[selectedImage]}
                            alt={product.title}
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Navigation Arrows */}
                        <button
                            onClick={() => setSelectedImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1))}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded-full shadow-md transition"
                        >
                            ←
                        </button>
                        <button
                            onClick={() => setSelectedImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1))}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white px-2 py-1 rounded-full shadow-md transition"
                        >
                            →
                        </button>
                    </div>

                    {/* Thumbnails */}
                    <div className="grid grid-flow-col auto-cols-max gap-3 overflow-x-auto pb-4 scrollbar-hide">
                        {product.images.map((thumb: string, index: number) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`border-2 rounded-md overflow-hidden transition-all ${selectedImage === index ? 'border-indigo-600 scale-105' : 'border-transparent'
                                    }`}
                            >
                                <div className='w-34 h-30 relative'>
                                    <Image
                                        src={thumb}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side - Product Info */}
                <div>
                    <div className="flex items-start justify-between mb-2">
                        <h1 className="text-4xl font-semibold flex-1 pr-4">{product.title}</h1>

                        {/* Heart Icon */}
                        <button
                            className="group"
                            onClick={addToWishlist}
                            disabled={isAdding}
                        >
                            {isAdding
                                ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500"></div>
                                : <Heart
                                    size={20}
                                    className={`transition-all duration-300 ${isWishlisted
                                        ? 'text-red-500 fill-red-500'
                                        : 'text-gray-400 group-hover:text-red-500 group-hover:fill-red-500'
                                        }`}
                                />
                            }
                        </button>
                    </div>

                    <div className="flex items-center gap-3 mb-6">
                        <StarRating rating={product.ratingsAverage} />
                        <span className="text-gray-600">
                            {product.ratingsAverage} ({product.ratingsQuantity} reviews)
                        </span>
                    </div>

                    <div className="text-3xl font-bold mb-1 pe-3 inline-block">
                        {formatPrice(product.price)}
                    </div>
                    <p className="text-green-600 font-medium inline-block">{product.quantity == 0 ? "Out Off Stock" : "In Stock"}</p>

                    {/* Tabs */}
                    <div className="border-b mt-8 mb-6">
                        <div className="flex gap-8">
                            {(['description', 'details', 'shipping'] as const).map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 font-medium text-md border-b-2 transition ${activeTab === tab
                                        ? 'border-black text-black'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    {tab === 'description' ? 'Description' :
                                        tab === 'details' ? 'Details' : 'Shipping'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Tab Content */}
                    <div>
                        {activeTab === 'description' && (
                            <div className="space-y-6 text-gray-700">
                                <div>
                                    <p>{product.description}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'details' && (
                            <div className="text-gray-700">
                                <p>More detailed specifications coming soon...</p>
                            </div>
                        )}

                        {activeTab === 'shipping' && (
                            <div className="text-gray-700">
                                <p>At our Company, we understand the importance of timely delivery. We offer a variety of shipping options to suit your needs, including standard, expedited, and express shipping. Our dedicated team works diligently to process and dispatch your orders promptly, aiming to deliver them to your doorstep within the estimated timeframe.</p>
                            </div>
                        )}
                    </div>

                    {/* Quantity & Add to Cart */}
                    <div className="mt-10 flex items-center gap-6">
                        <div className="flex items-center border rounded-lg">
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="px-4 py-3 text-xl hover:bg-gray-100 transition"
                            >
                                −
                            </button>
                            <span className="px-6 py-3 font-medium text-lg border-x">{quantity}</span>
                            <button
                                onClick={() => setQuantity(quantity + 1)}
                                className="px-4 py-3 text-xl hover:bg-gray-100 transition"
                            >
                                +
                            </button>
                        </div>

                        <button onClick={addToCart} disabled={isLoading} className="flex-1 disabled:bg-indigo-300 bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition">
                            {isLoading ? <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div> :<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>}
                            Add to cart
                        </button>
                    </div>

                    {/* Buy Now */}
                    <button className="w-full mt-4 border border-gray-300 hover:bg-gray-50 py-4 rounded-xl text-lg transition">
                        Buy now
                    </button>
                </div>
            </div>

            <div className='container mx-auto py-20 px-5'>
                <h2 className="text-3xl md:text-4xl text-center mb-6">
                    Related products
                </h2>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {products.filter((p) => p.category.name === product.category.name).slice(0, 5).map((product) => <ProductCard key={product._id} product={product}/>)}
                </div>
            </div>
        </div>
    );
}