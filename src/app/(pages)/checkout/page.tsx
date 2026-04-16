import apiServices from "@/services/api"
import InnerCheckout from "./innerCheckout"

export default async function Checkout() {
    const cart = await apiServices.getCart()
    const address = await apiServices.getUserAdreesses()    

    return <InnerCheckout cart={cart} address={address.data} />
}