import { Button } from "./ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { AspectRatio } from "./ui/aspect-ratio";
import { useState } from "react";
import { CartProduct as ICartProduct } from "@/interfaces/cart/CartProduct";

export default function CartProduct({ item, removeItem, updateProductCount }: { item: ICartProduct; removeItem: (productId: string) => Promise<void>; updateProductCount: (productId: string, count: number) => Promise<void> }) {

    const [isDeleting, setIsDeleting] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [isIncreasing, setIsIncreasing] = useState(false);
    const [isDecreasing, setIsDecreasing] = useState(false);

    async function handleRemoveProductFromCart() {
        setIsDeleting(true);
        await removeItem(item.product._id);
        setIsDeleting(false);
    }

    async function handleUpdateProductCount(count: number) {
        if (count > item.count) {
            setIsIncreasing(true);
        } else {
            setIsDecreasing(true);
        }
        setIsUpdating(true);
        await updateProductCount(item.product._id, count);
        setIsUpdating(false);
        setIsIncreasing(false);
        setIsDecreasing(false);
    }

    return (
        <div
            key={item._id}
            className="flex gap-4 rounded-lg border bg-card p-4"
        >
            <div className="w-24 shrink-0">
                <AspectRatio
                    ratio={1}
                    className="overflow-hidden rounded-md bg-muted"
                >
                    <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="size-full object-cover"
                    />
                </AspectRatio>
            </div>

            <div className="flex flex-1 flex-col justify-between">
                <div>
                    <h3 className="font-medium">{item.product.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.product.brand.name}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button onClick={() => handleUpdateProductCount(item.count - 1)} disabled={item.count == 1 || isUpdating} variant="outline" size="icon" className="size-8">
                        {isDecreasing
                            ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 me-1"></div>
                            : <Minus className="size-3" />
                        }
                    </Button>
                    <span className="w-8 text-center">{item.count}</span>
                    <Button onClick={() => handleUpdateProductCount(item.count + 1)} disabled={isUpdating} variant="outline" size="icon" className="size-8">
                        {isIncreasing
                            ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 me-1"></div>
                            : <Plus className="size-3" />
                        }
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end justify-between">
                <div className="text-right">
                    <p className="font-semibold">
                        {formatPrice(item.price * item.count)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        {formatPrice(item.price)}
                    </p>
                </div>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground"
                    onClick={handleRemoveProductFromCart}
                    disabled={isDeleting}
                >
                    {isDeleting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-ring me-1"></div>
                    ) : (
                        <Trash2 className="mr-1 size-4" />
                    )}
                    Remove
                </Button>
            </div>
        </div>
    )
}
