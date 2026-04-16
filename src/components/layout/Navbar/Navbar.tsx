"use client";

import { Heart, MenuIcon, ShoppingCart, UserRound } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { cartContext } from "@/contexts/cartContext";
import { useContext } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

interface NavbarProps {
    className?: string;
    userName?: string;
}

export default function Navbar({ className, userName }: NavbarProps) {

    const { cartCount, isLoading } = useContext(cartContext);

    const session = useSession()
    const router = useRouter()

    return (
        <section className={cn("p-4 fixed z-2 bg-white/70 backdrop-blur-xl left-0 right-0", className)}>
            <div className="container mx-auto">
                <nav className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <Image
                            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                            width={32}
                            height={32}
                            className="max-h-8"
                            alt="Logo"
                        />
                        <span className="text-lg font-semibold tracking-tighter">
                            TECHMART
                        </span>
                    </Link>
                    <NavigationMenu className="hidden lg:block ">
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link
                                    href="/"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Home
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link
                                    href="/products"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Shop
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link
                                    href="/categories"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Categories
                                </Link>
                            </NavigationMenuItem>

                            <NavigationMenuItem>
                                <Link
                                    href="/brands"
                                    className={navigationMenuTriggerStyle()}
                                >
                                    Brands
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                    <div className="flex gap-5 items-center">
                        {session.status == "authenticated" &&
                            <div className="gap-1 hidden lg:flex">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="p-2 rounded-full bg-transparent text-black hover:bg-gray-100 hover:text-indigo-500 transition border-0 focus-visible:ring-0"><UserRound size={20} /></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-40" align="start">
                                        <DropdownMenuGroup>
                                            <div className="p-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="rounded-full w-9 h-9 bg-indigo-100 flex items-center justify-center">
                                                        <UserRound size={18} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-lg font-semibold text-gray-800">{userName}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">
                                                <UserRound className="hover:text-indigo-500" size={18} />
                                                My Profile
                                            </Link>
                                        </DropdownMenuGroup>
                                        <DropdownMenuGroup>
                                            <Link href="/allorders" className="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-indigo-500 hover:bg-indigo-50" >
                                                <svg data-prefix="fas" data-icon="box-open" className="svg-inline--fa fa-box-open w-4 group-hover:text-indigo-500" role="img" viewBox="0 0 640 512" aria-hidden="true">
                                                    <path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
                                                </svg>
                                                My Orders
                                            </Link>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <Link href="/auth/signin">
                                                <button onClick={() => signOut({callbackUrl: '/auth/signin'})} className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                                                    <svg data-prefix="fas" data-icon="right-from-bracket" className="svg-inline--fa fa-right-from-bracket w-4" role="img" viewBox="0 0 512 512" aria-hidden="true">
                                                        <path fill="currentColor" d="M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                                                    </svg>
                                                    Sign Out
                                                </button>
                                            </Link>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                <Link href="/wishlist" className="p-2 rounded-full hover:bg-gray-100 hover:text-indigo-500 transition">
                                    <Heart size={18} />
                                </Link>

                                <Link href="/cart" className="relative p-2 rounded-full hover:bg-gray-100 hover:text-indigo-500 transition">
                                    <ShoppingCart size={18} />
                                    <span className="absolute top-0.5 -right-1 size-4.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                                        {isLoading
                                            ? <div className="animate-spin rounded-full h-2.5 w-2.5 border-t-2 border-b-2 border-white"></div>
                                            : cartCount
                                        }
                                    </span>
                                </Link>
                            </div>
                        }

                        {session.status == "unauthenticated" &&
                            <div className="hidden items-center gap-4 lg:flex">
                                <Button onClick={() => router.push("/auth/signin")} className="bg-indigo-500 text-md ">
                                    Sign in
                                </Button>
                            </div>
                        }
                    </div>
                    <Sheet>
                        <SheetTrigger asChild className="lg:hidden">
                            <div className="flex gap-4">
                                <div className="gap-1 flex">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button className="p-2 rounded-full bg-transparent text-black hover:bg-gray-100 hover:text-indigo-500 transition border-0 focus-visible:ring-0"><UserRound size={20} /></Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-40" align="start">
                                            <DropdownMenuGroup>
                                                <div className="p-2">
                                                    <div className="flex items-center gap-3">
                                                        <div className="rounded-full w-9 h-9 bg-indigo-100 flex items-center justify-center">
                                                            <UserRound size={18} />
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-lg font-semibold text-gray-800">aya</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <Link href="/profile" className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-indigo-500 hover:bg-indigo-50 transition-colors">
                                                    <UserRound className="hover:text-indigo-500" size={18} />
                                                    My Profile
                                                </Link>
                                            </DropdownMenuGroup>
                                            <DropdownMenuGroup>
                                                <Link href="/allorders" className="group flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-indigo-500 hover:bg-indigo-50" >
                                                    <svg data-prefix="fas" data-icon="box-open" className="svg-inline--fa fa-box-open w-4 group-hover:text-indigo-500" role="img" viewBox="0 0 640 512" aria-hidden="true">
                                                        <path fill="currentColor" d="M560.3 237.2c10.4 11.8 28.3 14.4 41.8 5.5 14.7-9.8 18.7-29.7 8.9-44.4l-48-72c-2.8-4.2-6.6-7.7-11.1-10.2L351.4 4.7c-19.3-10.7-42.8-10.7-62.2 0L88.8 116c-5.4 3-9.7 7.4-12.6 12.8L27.7 218.7c-12.6 23.4-3.8 52.5 19.6 65.1l33 17.7 0 53.3c0 23 12.4 44.3 32.4 55.7l176 99.7c19.6 11.1 43.5 11.1 63.1 0l176-99.7c20.1-11.4 32.4-32.6 32.4-55.7l0-117.5zm-240-9.8L170.2 144 320.3 60.6 470.4 144 320.3 227.4zm-41.5 50.2l-21.3 46.2-165.8-88.8 25.4-47.2 161.7 89.8z" />
                                                    </svg>
                                                    My Orders
                                                </Link>
                                            </DropdownMenuGroup>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuGroup>
                                                <Link href="/auth/signin">
                                                    <button className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left">
                                                        <svg data-prefix="fas" data-icon="right-from-bracket" className="svg-inline--fa fa-right-from-bracket w-4" role="img" viewBox="0 0 512 512" aria-hidden="true">
                                                            <path fill="currentColor" d="M505 273c9.4-9.4 9.4-24.6 0-33.9L361 95c-6.9-6.9-17.2-8.9-26.2-5.2S320 102.3 320 112l0 80-112 0c-26.5 0-48 21.5-48 48l0 32c0 26.5 21.5 48 48 48l112 0 0 80c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2L505 273zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                                                        </svg>
                                                        Sign Out
                                                    </button>
                                                </Link>
                                            </DropdownMenuGroup>
                                        </DropdownMenuContent>
                                    </DropdownMenu>

                                    <Link href="#" className="p-2 rounded-full hover:bg-gray-100 hover:text-indigo-500 transition">
                                        <Heart size={18} />
                                    </Link>

                                    <Link href="#" className="relative p-2 rounded-full hover:bg-gray-100 hover:text-indigo-500 transition">
                                        <ShoppingCart size={18} />
                                        <span className="absolute top-0.5 -right-1 size-4.5 rounded-full bg-indigo-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                                            2
                                        </span>
                                    </Link>
                                </div>
                                <Button variant="outline" size="icon">
                                    <MenuIcon className="h-4 w-4" />
                                </Button>
                            </div>
                        </SheetTrigger>
                        <SheetContent side="top" className="max-h-screen overflow-auto">
                            <SheetHeader>
                                <SheetTitle>
                                    <Link href="/" className="flex items-center gap-2">
                                        <Image
                                            src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                                            width={32}
                                            height={32}
                                            className="max-h-8"
                                            alt="Shadcn UI Navbar"
                                        />
                                        <span className="text-lg font-semibold tracking-tighter">
                                            TECHMART
                                        </span>
                                    </Link>
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col p-4">
                                <div className="flex flex-col gap-6">
                                    <Link href="/" className="font-medium">
                                        Home
                                    </Link>
                                    <Link href="/categories" className="font-medium">
                                        Categories
                                    </Link>
                                    <Link href="/brands" className="font-medium">
                                        Brands
                                    </Link>
                                </div>
                                <div className="mt-6 flex flex-col gap-4">
                                    <Button className="bg-indigo-500">Sign in</Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </nav>
            </div>
        </section>
    );
}