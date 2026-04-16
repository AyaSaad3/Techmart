import { AddressResponse } from '@/interfaces/addess/AddressResponse';
import { ResponseType } from './../types/ResponseType';
import { AddToCartResponse } from '@/interfaces/cart/AddToCartResponse';
import { Order } from '@/interfaces/order/Order';
import { IBrand } from '@/interfaces/product/IBrand';
import { ICategory } from '@/interfaces/product/ICategory';
import { IProduct } from '@/interfaces/product/IProduct';
import { VerifyTokenResponse } from '@/interfaces/user/VerifyTokenResponse';
import { WishlistResponse } from '@/interfaces/wishlist/WishlistResponse';
import { AddAddress } from '@/interfaces/addess/AddAddress';
import { SignInResponse } from '@/types/SignInResponse';
import { SignUpData } from '@/interfaces/signup/SignUpData';

class ApiServices {
    #BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
    #headers = {
        "Content-Type": "application/json",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDk4MzE3YjhhMjA2MmNhZmVjZWE0YiIsIm5hbWUiOiJBeWEiLCJyb2xlIjoidXNlciIsImlhdCI6MTc3NTg2MjU1MiwiZXhwIjoxNzgzNjM4NTUyfQ.8UsY4v8SZdKpzXQktIbjRvvt9WqCaxLAoW50g5RAXQ4"
    }
    async getProducts(): Promise<IProduct[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/products")
        const data: ResponseType<IProduct> = await response.json()
        return data.data
    }

    async getCategories(): Promise<ICategory[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/categories")
        const data: ResponseType<ICategory> = await response.json()
        return data.data
    }

    async getBrands(): Promise<IBrand[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/brands")
        const data: ResponseType<IBrand> = await response.json()
        return data.data
    }

    async getProductDetails(productId: string): Promise<IProduct> {
        const response = await fetch(this.#BASE_URL + "/api/v1/products/" + productId)
        const { data: product } = await response.json()
        return product
    }

    async addProductToCart(productId: string): Promise<AddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart", {
            body: JSON.stringify({ productId }),
            method: "post",
            headers: this.#headers
        })

        const data = await response.json()
        console.log(data);

        return data;
    }

    async getCart(): Promise<AddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart", {
            headers: this.#headers
        })

        const data = await response.json()
        return data;
    }

    async removeProductFromCart(productId: string): Promise<AddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart/" + productId, {
            method: "delete",
            headers: this.#headers
        })

        const data = await response.json()
        return data;
    }

    async clearCart(): Promise<AddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart", {
            method: "delete",
            headers: this.#headers
        })

        const data = await response.json()
        return data;
    }

    async updateProductCount(productId: string, count: number): Promise<AddToCartResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v2/cart/" + productId, {
            method: "put",
            headers: this.#headers,
            body: JSON.stringify({ count })
        })

        const data = await response.json()
        return data;
    }

    async checkout(cardId: string) {
        const response = await fetch(this.#BASE_URL + "/api/v1/orders/checkout-session/" + cardId + "?url=http://localhost:3000", {
            body: JSON.stringify({
                "shippingAddress": {
                    "details": "details",
                    "phone": "01010700999",
                    "city": "Cairo"
                }
            }),
            headers: this.#headers,
            method: "post"
        })

        const data = await response.json()
        return data;
    }

    async getUserInfo(): Promise<VerifyTokenResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/auth/verifyToken", {
            headers: this.#headers,
        })
        const data = await response.json()
        return data;
    }

    async getUserOrders(userId: string): Promise<Order[]> {
        const response = await fetch(this.#BASE_URL + "/api/v1/orders/user/" + userId, {
            headers: this.#headers,
        })

        const data = await response.json()
        return data;
    }

    async getWishlist(): Promise<WishlistResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/wishlist", {
            headers: this.#headers,
        })
        const data = await response.json()
        return data;
    }

    async removeProductFromWishlist(productId: string): Promise<WishlistResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/wishlist/" + productId, {
            method: "delete",
            headers: this.#headers
        })

        const data = await response.json()
        return data;
    }

    async addProductToWishlist(productId: string): Promise<WishlistResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/wishlist", {
            body: JSON.stringify({ productId }),
            method: "post",
            headers: this.#headers
        })

        const data = await response.json()
        console.log(data);

        return data;
    }

    async getUserAdreesses(): Promise<AddressResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/addresses", {
            headers: this.#headers,
        })
        const data = await response.json()
        return data;
    }

    async removeAddress(addressId: string): Promise<AddressResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/addresses/" + addressId, {
            method: "delete",
            headers: this.#headers,
        })
        const data = await response.json()
        return data;
    }

    async addAddress(addressInfo: AddAddress): Promise<AddressResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/addresses", {
            body: JSON.stringify(addressInfo),
            method: "post",
            headers: this.#headers
        })

        const data = await response.json()
        return data;
    }

    async signIn(email: string, password: string): Promise<SignInResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/auth/signin", {
            method: "post",
            headers: this.#headers,
            body: JSON.stringify({
                email,
                password
            })
        })
        const data = await response.json()
        return data;
    }

    async signUp(data: SignUpData): Promise<SignInResponse> {
        const response = await fetch(this.#BASE_URL + "/api/v1/auth/signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        const result = await response.json()
        return result
    }
}

const apiServices = new ApiServices()
export default apiServices