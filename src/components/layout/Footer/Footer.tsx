import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    <div className="lg:col-span-2 max-w-md ">
                        <Link className="inline-block mb-6" href="/">
                            <div className="bg-white rounded-lg px-4 py-2 flex items-center gap-2">
                                <Image
                                    src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                                    width={30}
                                    height={30}
                                    className=""
                                    alt="Logo"
                                />
                                <span className="text-black font-semibold text-lg">TECHMART</span>
                            </div>
                        </Link>
                        <p className="text-gray-400 mb-6 text-sm leading-relaxed">Techmart is your one-stop destination for quality products. From fashion to electronics, we bring you the best brands at competitive prices with a seamless shopping experience.</p>
                        <div className="space-y-3 mb-6">
                            <a href="tel:+18001234567" className="flex items-center gap-3 text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                                <svg data-prefix="fas" data-icon="phone" className="svg-inline--fa fa-phone text-primary-500" role="img" viewBox="0 0 512 512" aria-hidden="true" width={16} height={16}>
                                    <path fill="currentColor" d="M160.2 25C152.3 6.1 131.7-3.9 112.1 1.4l-5.5 1.5c-64.6 17.6-119.8 80.2-103.7 156.4 37.1 175 174.8 312.7 349.8 349.8 76.3 16.2 138.8-39.1 156.4-103.7l1.5-5.5c5.4-19.7-4.7-40.3-23.5-48.1l-97.3-40.5c-16.5-6.9-35.6-2.1-47 11.8l-38.6 47.2C233.9 335.4 177.3 277 144.8 205.3L189 169.3c13.9-11.3 18.6-30.4 11.8-47L160.2 25z" />
                                </svg>
                                <span>+1 (800) 123-4567</span>
                            </a>
                            <a href="mailto:support@techmart.com" className="flex items-center gap-3 text-gray-400 hover:text-indigo-500 transition-colors text-sm">
                                <svg data-prefix="fas" data-icon="envelope" className="svg-inline--fa fa-envelope text-primary-500" role="img" viewBox="0 0 512 512" aria-hidden="true" width={16} height={16}>
                                    <path fill="currentColor" d="M48 64c-26.5 0-48 21.5-48 48 0 15.1 7.1 29.3 19.2 38.4l208 156c17.1 12.8 40.5 12.8 57.6 0l208-156c12.1-9.1 19.2-23.3 19.2-38.4 0-26.5-21.5-48-48-48L48 64zM0 196L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-188-198.4 148.8c-34.1 25.6-81.1 25.6-115.2 0L0 196z" />
                                </svg>
                                <span>support@techmart.com</span>
                            </a>
                            <div className="flex items-start gap-3 text-gray-400 text-sm">
                                <svg data-prefix="fas" data-icon="location-dot" className="svg-inline--fa fa-location-dot text-primary-500 mt-0.5" role="img" viewBox="0 0 384 512" aria-hidden="true" width={16} height={16}>
                                    <path fill="currentColor" d="M0 188.6C0 84.4 86 0 192 0S384 84.4 384 188.6c0 119.3-120.2 262.3-170.4 316.8-11.8 12.8-31.5 12.8-43.3 0-50.2-54.5-170.4-197.5-170.4-316.8zM192 256a64 64 0 1 0 0-128 64 64 0 1 0 0 128z" />
                                </svg>
                                <span>123 Commerce Street, New York, NY 10001</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <svg data-prefix="fab" data-icon="facebook-f" className="svg-inline--fa fa-facebook-f" role="img" viewBox="0 0 320 512" aria-hidden="true" width={16} height={16}>
                                    <path fill="currentColor" d="M80 299.3l0 212.7 116 0 0-212.7 86.5 0 18-97.8-104.5 0 0-34.6c0-51.7 20.3-71.5 72.7-71.5 16.3 0 29.4 .4 37 1.2l0-88.7C291.4 4 256.4 0 236.2 0 129.3 0 80 50.5 80 159.4l0 42.1-66 0 0 97.8 66 0z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <svg data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter" role="img" viewBox="0 0 512 512" aria-hidden="true" width={16} height={16}>
                                    <path fill="currentColor" d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103l0-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <svg data-prefix="fab" data-icon="instagram" className="svg-inline--fa fa-instagram" role="img" viewBox="0 0 448 512" aria-hidden="true" width={16} height={16}>
                                    <path fill="currentColor" d="M224.3 141a115 115 0 1 0 -.6 230 115 115 0 1 0 .6-230zm-.6 40.4a74.6 74.6 0 1 1 .6 149.2 74.6 74.6 0 1 1 -.6-149.2zm93.4-45.1a26.8 26.8 0 1 1 53.6 0 26.8 26.8 0 1 1 -53.6 0zm129.7 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM399 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                </svg>
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white transition-colors">
                                <svg data-prefix="fab" data-icon="youtube" className="svg-inline--fa fa-youtube" role="img" viewBox="0 0 576 512" aria-hidden="true" width={16} height={16}>
                                    <path fill="currentColor" d="M549.7 124.1C543.5 100.4 524.9 81.8 501.4 75.5 458.9 64 288.1 64 288.1 64S117.3 64 74.7 75.5C51.2 81.8 32.7 100.4 26.4 124.1 15 167 15 256.4 15 256.4s0 89.4 11.4 132.3c6.3 23.6 24.8 41.5 48.3 47.8 42.6 11.5 213.4 11.5 213.4 11.5s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.2 337.6l0-162.4 142.7 81.2-142.7 81.2z" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-5">Shop</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/products">All Products</Link>
                            </li>
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/categories">Categories</Link>
                            </li>
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/brands">Brands</Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-semibold text-lg mb-5">Account</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/profile">My Account</Link>
                            </li>
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/allorders">Order History</Link>
                            </li>
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/wishlist">Wishlist</Link>
                            </li>
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/cart">Shopping Cart</Link>
                            </li>
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/auth/signin">Sign In</Link>
                            </li>
                            <li>
                                <Link className="text-gray-400 hover:text-indigo-500 transition-colors text-sm" href="/auth/signup">Create Account</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div >
        </footer >
    );
};