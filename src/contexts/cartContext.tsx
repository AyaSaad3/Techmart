"use client"

import apiServices from "@/services/api";
import { SessionProvider } from "next-auth/react";
import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";

export const cartContext = createContext<{ cartCount: number; setCartCount: Dispatch<SetStateAction<number>>; isLoading: boolean }>({
    cartCount: 0,
    setCartCount: () => { },
    isLoading: true
})

export default function CartContextProvider({ children }: { children: ReactNode }) {

    const [cartCount, setCartCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    async function getCart() {
        setIsLoading(true);
        const response = await apiServices.getCart();
        setCartCount(response.numOfCartItems);
        setIsLoading(false);
    }

    useState(() => {
        getCart();
    }, []);

    return <>
        <SessionProvider>
            <cartContext.Provider value={{ cartCount, setCartCount, isLoading }}>{children}</cartContext.Provider>
        </SessionProvider>
    </>
}