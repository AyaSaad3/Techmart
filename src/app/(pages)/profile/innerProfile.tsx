"use client";

import { Button } from "@/components/ui/button";
import { AddressResponse } from "@/interfaces/addess/AddressResponse";
import apiServices from "@/services/api";
import { Building2, MapPin, Phone, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import AddressForm from "@/components/AddressForm";

export default function InnerProfile({ address }: { address: AddressResponse }) {

    const [innerAddress, setInnerAddress] = useState<AddressResponse>(address);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [open, setOpen] = useState(false);

    async function removeAddress(addressId: string) {
        setIsDeleting(addressId);
        const response = await apiServices.removeAddress(addressId);
        setInnerAddress(response);
        setIsDeleting(null);
    }

    if (innerAddress.data.length === 0) {
        return (
            <section className="py-18">
                <div className="relative bg-cover py-8 pb-20">
                    <div className="relative text-center">
                        <h1 className="text-5xl font-semibold mb-3">
                            My Account
                        </h1>

                        <nav className="flex justify-center items-center gap-2 text-md">
                            <Link href="/" className='hover:text-indigo-500 transition'>
                                Home
                            </Link>
                            <span>/</span>
                            <span className="text-gray-500 font-medium">
                                My Account
                            </span>
                        </nav>
                    </div>
                </div>
                <div className="container max-w-lg text-center">
                    <div className="w-18 h-18 mb-5 mx-auto rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                        <MapPin size={30} />
                    </div>
                    <h1 className="mb-4 text-2xl font-semibold">No Addresses Yet</h1>
                    <p className="mb-8 text-muted-foreground">
                        Add your first delivery address to make checkout faster and easier.
                    </p>
                    <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-indigo-600 font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25">
                        <Plus size={20} />
                        Add Your First Address
                    </button>
                </div>
            </section>
        );
    }

    return (
        <div>
            <div className="relative bg-cover py-8">
                <div className="relative text-center">
                    <h1 className="text-5xl font-semibold mb-3">
                        My Account
                    </h1>

                    <nav className="flex justify-center items-center gap-2 text-md">
                        <Link href="/" className='hover:text-indigo-500 transition'>
                            Home
                        </Link>
                        <span>/</span>
                        <span className="text-gray-500 font-medium">
                            My Account
                        </span>
                    </nav>
                </div>
            </div>

            <div className='container mx-auto py-10 px-5'>
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">My Addresses</h2>
                        <p className="text-gray-500 text-sm mt-1">Manage your saved delivery addresses</p>
                    </div>

                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white bg-indigo-600 font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/25">
                                <Plus size={16} />
                                Add Address
                            </button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-sm [&>button]:h-12 [&>button]:w-12">
                            <DialogHeader className="text-left">
                                <DialogTitle className="font-bold text-xl">Add New Address</DialogTitle>
                            </DialogHeader>

                            <div className="pt-2">
                                <AddressForm onAddressAdded={setInnerAddress} onClose={() => setOpen(false)} />
                            </div>

                            <DialogFooter className="border-0 bg-white grid grid-cols-2">
                                <DialogClose asChild>
                                    <Button className="text-[16px] py-5" variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button className="bg-indigo-500 hover:bg-indigo-700 text-[16px] py-5 transform" type="submit" form="add-address-form">Add Address</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {innerAddress.data.map((addr) => (
                        <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 group">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex items-start gap-4 flex-1">
                                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-100 transition-colors">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-gray-900 mb-1 text-xl">{addr.name}</h3>
                                        <p className="text-gray-600 mb-3 line-clamp-2 text-[16px]">{addr.details}</p>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                            <span className="flex items-center gap-1.5 text-[16px]">
                                                <Phone size={12} />
                                                {addr.phone}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-[16px]">
                                                <Building2 size={12} />
                                                {addr.city}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <button onClick={() => removeAddress(addr._id)} disabled={isDeleting == addr._id} className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors disabled:opacity-50" title="Delete address">
                                        {isDeleting == addr._id
                                            ? <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 me-1"></div>
                                            : <Trash2 size={16} />
                                        }
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
