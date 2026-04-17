import apiServices from "@/services/api"
import InnerCheckout from "./innerCheckout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export default async function Checkout() {

    const session = await getServerSession(authOptions)
    const token = session?.user.token 

    const cart = await apiServices.getCart(token?? "")
    const address = await apiServices.getUserAdreesses(token ?? "")    

    return <InnerCheckout cart={cart} address={address.data} />
}