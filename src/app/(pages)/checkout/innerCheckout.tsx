'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Building2, Gift, Lock, MapPin, Phone, Shield, Truck } from 'lucide-react'
import Link from 'next/link'
import apiServices from '@/services/api'
import { AddToCartResponse } from '@/interfaces/cart/AddToCartResponse'
import { formatPrice } from '@/lib/utils'
import { Address } from '@/interfaces/addess/Address'
import AddressForm from '@/components/AddressForm'

export default function InnerCheckout({ cart, address }: { cart: AddToCartResponse; address: Address[] }) {
    const [step, setStep] = useState(1)

    const nextStep = () => setStep(prev => Math.min(prev + 1, 2))
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<string | null>(null)

    async function handleCheckout() {
        setCheckoutLoading(true);
        const response = await apiServices.checkout(cart.cartId);
        setCheckoutLoading(false);
        location.href = response.session.url;
    }

    return (
        <div className='bg-muted/30'>
            <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
                {/* Header */}
                <div className="relative bg-cover py-8">
                    <div className="relative text-center">
                        <h1 className="text-5xl font-semibold mb-3">Complete Your Orders</h1>

                        <nav className="flex justify-center items-center gap-2 text-md">
                            <Link href="/" className='hover:text-indigo-500 transition'>Home</Link>
                            <span>/</span>
                            <Link href="/cart" className='hover:text-indigo-500 transition'>Cart</Link>
                            <span>/</span>
                            <span className="text-gray-500 font-medium">Checkout</span>
                        </nav>
                    </div>
                </div>

                {/* Progress Indicator */}
                <div className='mb-8 flex justify-center'>
                    <div className='flex items-center gap-4'>
                        {[1, 2].map(stepNumber => (
                            <div key={stepNumber} className='flex items-center'>
                                <div
                                    className={`flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${stepNumber <= step ? 'bg-indigo-500 text-primary-foreground' : 'bg-muted text-muted-foreground'
                                        }`}
                                >
                                    {stepNumber}
                                </div>
                                {stepNumber < 2 ? (
                                    <div
                                        className={`mx-4 h-1 w-16 rounded transition-colors ${stepNumber < step ? 'bg-indigo-500' : 'bg-muted'
                                            }`}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </div>
                </div>

                <div className='grid gap-8 lg:grid-cols-3'>
                    {/* Main Form */}
                    <div className='lg:col-span-2'>
                        <Card>
                            <CardHeader>
                                <CardTitle className='text-balance'>
                                    {step === 1 && 'Saved Addresses'}
                                    {step === 2 && 'Shipping Address'}
                                </CardTitle>
                                <CardDescription>
                                    {step === 1 && "Select a saved address or enter a new one"}
                                    {step === 2 && 'Where should we deliver your order?'}
                                </CardDescription>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-6'>
                                {/* Step 1: Saved Addresses */}
                                {step === 1 ? (
                                    <>
                                        {address.map((addr) => (
                                            <div key={addr._id} className="relative flex flex-col gap-4">
                                                <button
                                                    onClick={() => setSelectedAddress(addr._id)}
                                                    type="button"
                                                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${selectedAddress === addr._id
                                                            ? "border-indigo-500 bg-indigo-50"
                                                            : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-3">
                                                        <div
                                                            className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${selectedAddress === addr._id
                                                                    ? "bg-indigo-100 text-indigo-600"
                                                                    : "bg-gray-100 text-gray-500"
                                                                }`}
                                                        >
                                                            <MapPin size={20} />
                                                        </div>

                                                        <div className="flex-1 min-w-0">
                                                            <p className="font-semibold text-lg text-gray-900">{addr.name}</p>
                                                            <p className="text-gray-600 mt-0.5 text-[16px]">{addr.details}</p>

                                                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                                                                <span className="flex items-center gap-1 text-sm">
                                                                    <Phone size={12} />
                                                                    {addr.phone}
                                                                </span>
                                                                <span className="flex items-center gap-1 text-sm">
                                                                    <Building2 size={12} />
                                                                    {addr.city}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </button>
                                            </div>
                                        ))}
                                    </>
                                ) : null}

                                {/* Step 2: Shipping Address */}
                                {step === 2 ? (
                                    <AddressForm />
                                ) : null}

                                {/* Navigation Buttons */}
                                <div className='flex justify-between pt-6'>
                                    {step === 1
                                        ? (
                                            <Button onClick={nextStep} variant='outline' className="h-9 px-4 py-2 cursor-pointer">
                                                Use a different address
                                            </Button>
                                        )
                                        : (
                                            <Button
                                                type='button'
                                                variant='outline'
                                                onClick={prevStep}
                                                className="h-9 px-4 py-2 flex cursor-pointer items-center gap-2"
                                            >
                                                <ArrowLeft className='size-4' />
                                                Back
                                            </Button>
                                        )
                                    }

                                    <Button disabled={checkoutLoading} onClick={handleCheckout} className="h-9 px-4 py-2 flex cursor-pointer items-center gap-2 bg-indigo-500">
                                        {checkoutLoading
                                            ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-ring me-1"></div>
                                            : <Lock className='size-4' />
                                        }
                                        Complete Order
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Order Summary */}
                    <div className='lg:col-span-1'>
                        <Card className='sticky top-8'>
                            <CardHeader>
                                <CardTitle className='text-balance'>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className='flex flex-col gap-4'>
                                {/* Items */}
                                <div className='flex flex-col gap-4'>
                                    {cart.data.products.map(item => (
                                        <div key={item._id} className='flex gap-4'>
                                            <div className='relative'>
                                                <img src={item.product.imageCover} alt={item.product.title} className='size-16 rounded-lg object-cover' />
                                                <Badge variant='secondary' className="px-2.5 py-0.5 font-semibold absolute -inset-e-2 -top-2 size-6 rounded-full p-0 text-xs text-indigo-600">
                                                    {item.count}
                                                </Badge>
                                            </div>
                                            <div className='min-w-0 flex-1'>
                                                <h4 className='truncate text-sm font-medium'>{item.product.title}</h4>
                                                <p className='text-muted-foreground text-xs'>{item.count} × {formatPrice(item.price)}</p>
                                                <p className='mt-1 text-sm font-medium'>{formatPrice(item.price * item.count)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <Separator />

                                {/* Pricing Breakdown */}
                                <div className='flex flex-col gap-2'>
                                    <div className='flex justify-between text-sm'>
                                        <span className='text-muted-foreground'>Subtotal</span>
                                        <span className='text-lg'>{formatPrice(cart.data.totalCartPrice)}</span>
                                    </div>
                                    <div className='flex justify-between text-sm'>
                                        <span className='text-muted-foreground flex items-center gap-1'>
                                            <Truck className='size-3' />
                                            Shipping
                                        </span>
                                        <span className='text-indigo-500 font-bold text-[16px]'>Free</span>
                                    </div>
                                </div>

                                <Separator />

                                <div className='flex justify-between font-semibold'>
                                    <span className='text-lg'>Total</span>
                                    <span className='text-lg'>{formatPrice(cart.data.totalCartPrice)}</span>
                                </div>

                                {/* Trust Indicators */}
                                <div className='flex flex-col gap-3 pt-4'>
                                    <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                                        <Shield className='size-4 text-green-600' />
                                        <span>SSL encrypted checkout</span>
                                    </div>
                                    <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                                        <Truck className='size-4 text-blue-600' />
                                        <span>Free shipping</span>
                                    </div>
                                    <div className='text-muted-foreground flex items-center gap-2 text-xs'>
                                        <Gift className='size-4 text-purple-600' />
                                        <span>30-day return policy</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}