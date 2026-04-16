import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import apiServices from "@/services/api";

export default async function CategoryProducts({ params }: { params: Promise<{ category: string }> }) {

    const { category } = await params;
    const categoryName = category
        .split('-')
        .map(word => {
            if (word == 'and') return '&';
            if (word == 'plus') return '+';
            return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(' ');
    
    async function getCategoryProducts() {
        const allProducts = await apiServices.getProducts();

        return allProducts.filter((product) => {
            const productCategory = product.category?.name;
            return productCategory == categoryName;
        });
    }
    
    const products = await getCategoryProducts();

    return (
        <div>
            <div className="relative bg-cover py-11">
                <div className="relative text-center">
                    <h1 className="text-5xl font-semibold mb-3 capitalize">
                        {categoryName}
                    </h1>

                    <nav className="flex justify-center items-center gap-2 text-md">
                        <Link href="/" className="hover:text-indigo-500 transition">
                            Home
                        </Link>
                        <span>/</span>
                        <Link href="/categories" className="hover:text-indigo-500 transition">
                            Categories
                        </Link>
                        <span>/</span>
                        <span className="text-gray-500 font-medium capitalize">
                            {categoryName}
                        </span>
                    </nav>
                </div>
            </div>

            <div className="container mx-auto py-10 px-5">
                <div className="mb-6 text-md text-gray-500">
                    Showing {products.length} products for <span className="font-semibold capitalize">{categoryName}</span>
                </div>

                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl text-gray-600">No products found for {categoryName}</h2>
                        <button>
                            <Link href="/products" className="inline-block mt-4 px-6 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition">
                                View All Products
                            </Link>
                        </button>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {products.map((product) => (<ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}