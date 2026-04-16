import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import apiServices from '@/services/api';

export default async function Products() {

    const products = await apiServices.getProducts()

    return (
        <div>
            <div className="relative bg-[url('/breadcumb-bkg.jpg')] bg-cover py-11">
                <div className="relative text-center">
                    <h1 className="text-5xl font-semibold mb-3">
                        Shop
                    </h1>

                    <nav className="flex justify-center items-center gap-2 text-md">
                        <Link href="/" className='hover:text-indigo-500 transition'>
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-gray-500 font-medium">
                            Shop
                        </span>
                    </nav>
                </div>
            </div>

            <div className='container mx-auto py-10 px-5'>
                <div className="mb-6 text-md text-gray-500">Showing {products.length} products</div>
                <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
                    {products.map((product) => <ProductCard key={product._id} product={product} />)}
                </div>
            </div>
        </div>
    )
}
