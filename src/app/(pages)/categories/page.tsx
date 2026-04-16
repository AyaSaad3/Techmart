import apiServices from "@/services/api"
import Link from "next/link"

export default async function Categories() {

  const categories = await apiServices.getCategories()

  return (
    <div>
      <div className="relative bg-cover py-11">
        <div className="relative text-center">
          <h1 className="text-5xl font-semibold mb-3">
            All Categories
          </h1>

          <nav className="flex justify-center items-center gap-2 text-md">
            <Link href="/" className='hover:text-indigo-500 transition'>
              Home
            </Link>
            <span>/</span>
            <span className="text-gray-500 font-medium">
              Categories
            </span>
          </nav>
        </div>
      </div>

      <div className='container mx-auto py-10 px-5'>
        <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
          {categories.map((category) => (
            <Link key={category._id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center text-center flex-1"
            >
              <div className="w-55 h-55 rounded-full overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <img src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="mt-3 text-lg text-gray-700 group-hover:text-indigo-500 transition">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
