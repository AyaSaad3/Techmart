import apiServices from "@/services/api";
import ProductDetail from "@/components/ProductDetail";

export default async function ProductDetails({ params }: { params: Promise<{ productId: string }> }) {

    const productId = await params.then((res) => res.productId)
    const product = await apiServices.getProductDetails(productId)
    const products = await apiServices.getProducts()

    return (
        <ProductDetail product={product} products={products} />
    )
}
