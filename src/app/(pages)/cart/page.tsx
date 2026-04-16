import apiServices from "@/services/api"
import { ShoppingCart } from "./InnerCart";

export default async function Cart() {

  const cart = await apiServices.getCart()

  return (
    <ShoppingCart cart={cart} />
  )
}
