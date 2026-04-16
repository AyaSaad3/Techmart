import ProductCard from "@/components/ProductCard";
import apiServices from "@/services/api";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from "next/link";

export default async function Home() {

  const categories = await apiServices.getCategories()
  const products = await apiServices.getProducts()

  const slides = [
    "/hero-img1.png",
    "/hero-img2.png",
  ];

  return (
    <div>
      <Carousel className="w-full">
        <CarouselContent>
          {slides.map((src, index) => (
            <CarouselItem key={index}>
              <div className="relative w-full aspect-16/7 md:aspect-21/9 lg:aspect-2/0.75 overflow-hidden">
                <Image src={src}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                <div className="absolute left-1/10 top-[70%] md:left-1/9 lg:left-3/20 lg:top-[71%] -translate-x-1/2 flex flex-col items-center justify-center z-10">
                  <button className="bg-indigo-500 hover:bg-indigo-700 
                         px-4 py-2 text-sm 
                         md:px-8 md:py-3 md:text-md 
                         lg:px-8.5 lg:py-3 lg:text-lg 
                         rounded-xl text-white font-medium 
                         transition-all active:scale-95 shadow-lg"
                  >
                    <Link href="/products">Shop Now</Link>
                  </button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>

      <div className="container mx-auto py-10 px-4">
        <div className="relative flex flex-col items-center md:flex-row md:justify-center my-8">
          <h2 className="text-3xl md:text-4xl text-center">
            Best For Your Categories
          </h2>

          <Link href="/categories"
            className="mt-3 self-end md:mt-0 md:absolute md:right-0 text-indigo-500 hover:text-indigo-700 font-medium flex items-center cursor-pointer"
          >
            View All Categories
            <svg
              className="ml-2"
              viewBox="0 0 512 512"
              width={16}
              height={16}
            >
              <path fill="currentColor"
                d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-105.4 105.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
              />
            </svg>
          </Link>
        </div>

        <div className="flex justify-between gap-6 overflow-hidden">
          {categories.slice(0, 6).map((category) => (
            <a key={category._id}
              href={`/categories/${category.slug}`}
              className="group flex flex-col items-center text-center flex-1"
            >
              <div className="w-17 h-17 sm:w-20 sm:h-20 md:w-25 md:h-25 lg:w-36 lg:h-36 xl:w-45 xl:h-45 rounded-full overflow-hidden bg-gray-100 shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <img src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <h3 className="mt-3 text-sm sm:text-base font-medium text-gray-700 group-hover:text-indigo-500 transition">
                {category.name}
              </h3>
            </a>
          ))}
        </div>

        <div className="mt-20 text-center">
          <h2 className="text-3xl md:text-4xl">Featured Products</h2>
        </div>

        <div className='container mx-auto py-10 px-5'>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
            {products.slice(0, 10).map((product) => <ProductCard key={product._id} product={product} />)}
          </div>
        </div>
      </div>
    </div>
  );
}