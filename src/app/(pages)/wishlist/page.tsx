import Link from "next/link";
import WishlistCart from "./wishlistCart";
import apiServices from "@/services/api";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Wishlist() {

  const session = await getServerSession(authOptions)
  const token = session?.user?.token

  const product = await apiServices.getWishlist(token ?? "")

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
