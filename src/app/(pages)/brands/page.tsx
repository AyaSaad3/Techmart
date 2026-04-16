import apiServices from "@/services/api";
import Link from "next/link";

export default async function Brands() {

  const brands = await apiServices.getBrands()

  return (
    <div>
      <div className="relative bg-cover py-11">
        <div className="relative text-center">
          <h1 className="text-5xl font-semibold mb-3">
            Top Brands
          </h1>

          <nav className="flex justify-center items-center gap-2 text-md">
            <Link href="/" className='hover:text-indigo-500 transition'>
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-500 font-medium">
              Brands
            </span>
          </nav>
        </div>
      </div>

      <div className='container mx-auto py-10 px-5'>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {brands.map((brand) => (
            <Link key={brand._id}
              href={`/brands/${brand.slug}`}
              className="group flex flex-col items-center text-center flex-1"
            >
              <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <img src={brand.image}
                  alt={brand.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="mt-3 text-lg text-gray-700 group-hover:text-indigo-500 transition">
                {brand.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
