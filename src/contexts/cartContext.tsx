"use client"

import apiServices from "@/services/api";
import { useSession } from "next-auth/react";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";

export const cartContext = createContext<{ cartCount: number; setCartCount: Dispatch<SetStateAction<number>>; isLoading: boolean }>({
    cartCount: 0,
    setCartCount: () => { },
    isLoading: true
})

export default function CartContextProvider({ children }: { children: ReactNode }) {

    const [cartCount, setCartCount] = useState(0)
    const [isLoading, setIsLoading] = useState(true);

    const { data: session, status} = useSession()
    const token = session?.user?.token

    async function getCart(userToken: string) {
        setIsLoading(true);
        const response = await apiServices.getCart(userToken);
        setCartCount(response.numOfCartItems);
        setIsLoading(false);
    }

    useEffect(() => {
        if (status == "authenticated" && token) {
            getCart(token)
        } else if (status == "unauthenticated") {
            setCartCount(0)
            setIsLoading(false)
        }
    }, [status, token])

    return <>
        <cartContext.Provider value={{ cartCount, setCartCount, isLoading }}>{children}</cartContext.Provider>
    </>
}