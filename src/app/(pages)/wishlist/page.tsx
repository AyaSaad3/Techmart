import Link from "next/link";
import WishlistCart from "./wishlistCart";
import apiServices from "@/services/api";

export default async function Wishlist() {

  const product = await apiServices.getWishlist()

  return (
    <div className="relative bg-cover py-8">
      <div className="relative text-center">
        <h1 className="text-5xl font-semibold mb-3">
          My Wishlist
        </h1>

        <nav className="flex justify-center items-center gap-2 text-md">
          <Link href="/" className='hover:text-indigo-500 transition'>
            Home
          </Link>
          <span>/</span>
          <span className="text-gray-500 font-medium">
            My Wishlist
          </span>
        </nav>
      </div>

      <div className="py-18">
        <WishlistCart product={product} />
      </div>
    </div>
  )
}
