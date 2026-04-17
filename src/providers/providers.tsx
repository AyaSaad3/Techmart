"use client"

import { SessionProvider } from "next-auth/react"
import CartContextProvider from "@/contexts/cartContext"

export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CartContextProvider>
                {children}
            </CartContextProvider>
        </SessionProvider>
    )
}