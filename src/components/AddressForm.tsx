'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from './ui/textarea'
import apiServices from '@/services/api'
import { AddressResponse } from '@/interfaces/addess/AddressResponse'
import { useForm } from 'react-hook-form'
import { AddAddress } from '@/interfaces/addess/AddAddress'
import { useSession } from 'next-auth/react'

export default function AddressForm({ onAddressAdded, onClose }: {
    onAddressAdded?: (data: AddressResponse) => void; onClose?: () => void
}) {

    const { register, handleSubmit, reset } = useForm<AddAddress>()

    const session = useSession()
    const token = session.data?.user.token 
    
    async function addAddress(data: AddAddress) {
        const response = await apiServices.addAddress(data, token ?? "");
        onAddressAdded?.(response)
        onClose?.()
        reset()
    }

    return (
        <form onSubmit={handleSubmit(addAddress)} id="add-address-form" className='flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>
                <Label htmlFor='addressName-mN7z84Q'>Address name</Label>
                <Input
                    id='addressName-mN7z84Q'
                    placeholder='Home'
                    className='h-9 focus-visible:ring-indigo-200'
                    {...register('name')}
                />
            </div>

            <div className='flex flex-col gap-2'>
                <Label htmlFor='address-qP4z17X'>Street address</Label>
                <Textarea
                    id='address-qP4z17X'
                    placeholder='123 Main Street'
                    rows={2}
                    className='min-h-20 focus-visible:ring-indigo-200 resize-none'
                    {...register('details')}
                />
            </div>

            <div className='grid gap-4 md:grid-cols-2'>
                <div className='flex flex-col gap-2'>
                    <Label htmlFor='phone-rM6n82S'>Phone number</Label>
                    <Input
                        id='phone-rM6n82S'
                        type='tel'
                        placeholder='01xxxxxxxxx'
                        className='h-9 focus-visible:ring-indigo-200'
                        {...register('phone')}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <Label htmlFor='city-sT5y91B'>City</Label>
                    <Input
                        id='city-sT5y91B'
                        placeholder='Cairo'
                        className='h-9 focus-visible:ring-indigo-200'
                        {...register('city')}
                    />
                </div>
            </div>
        </form>
    )
}
