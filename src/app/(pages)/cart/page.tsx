import apiServices from "@/services/api"
import { ShoppingCart } from "./InnerCart";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function Cart() {

  const session = await getServerSession(authOptions)
  const token = session?.user.token

  const cart = await apiServices.getCart(token?? "")

  return (
    <ShoppingCart cart={cart} />
  )
}
