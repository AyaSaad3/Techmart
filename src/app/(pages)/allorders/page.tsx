import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { formatPrice } from '@/lib/utils'
import apiServices from '@/services/api'
import Link from 'next/link'

export default async function Allorders() {
    const userInfo = await apiServices.getUserInfo()
    const orders = await apiServices.getUserOrders(userInfo.decoded.id)    

    return (
        <div>
            <div className="relative bg-cover py-8">
                <div className="relative text-center">
                    <h1 className="text-5xl font-semibold mb-3">My Orders</h1>

                    <nav className="flex justify-center items-center gap-2 text-md">
                        <Link href="/" className='hover:text-indigo-500 transition'>Home</Link>
                        <span>/</span>
                        <span className="text-gray-500 font-medium">My Orders</span>
                    </nav>
                </div>
            </div>

            <div className='mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8'>
                {orders.map((order) => (
                    <Card key={order._id} className='mb-10'>
                        <CardHeader className='flex flex-col gap-2 items-start md:items-center md:flex-row md:justify-between md:gap-x-6'>
                            <div>
                                <CardTitle className='text-2xl'>Order Details</CardTitle>
                                <CardDescription className='text-balance'>
                                    View your past orders and their status
                                </CardDescription>
                            </div>

                            <div className='text-end text-[16px] max-sm:text-start'>
                                <p>Total Orders: {order.cartItems.length}</p>
                            </div>
                        </CardHeader>

                        <CardContent>
                            {order.cartItems.length === 0 ? (
                                <div className='text-center py-10 text-gray-500'>
                                    No orders found
                                </div>
                            ) : (
                                <Table>
                                    <TableHeader>
                                        <TableRow className='hover:bg-transparent'>
                                            <TableHead className='font-semibold'>Item</TableHead>
                                            <TableHead className='hidden sm:table-cell text-center font-semibold'>Order Date</TableHead>
                                            <TableHead className='hidden md:table-cell text-center font-semibold'>Quantity</TableHead>
                                            <TableHead className='text-center font-semibold'>Price</TableHead>
                                        </TableRow>
                                    </TableHeader>

                                    <TableBody>
                                        {order.cartItems.map((item) => (
                                            <TableRow key={item._id}>
                                                <TableCell className='flex flex-col sm:flex-row sm:items-center gap-3 py-3'>
                                                    <img
                                                        src={item.product.imageCover}
                                                        alt={item.product.title}
                                                        className='w-16 h-16 rounded-md object-cover shrink-0'
                                                    />
                                                    <div className='flex-1 min-w-0'>
                                                        <p className='font-medium truncate'>{item.product.title}</p>
                                                        <p className='text-muted-foreground text-sm truncate'>
                                                            {item.product.brand.name}
                                                        </p>
                                                    </div>
                                                </TableCell>

                                                <TableCell className='hidden sm:table-cell text-center'>
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric',
                                                    })}
                                                </TableCell>

                                                <TableCell className='hidden md:table-cell text-center'>
                                                    {item.count}
                                                </TableCell>

                                                <TableCell className='text-center'>
                                                    {formatPrice(item.price * item.count)}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>

                                    <TableFooter className='bg-transparent'>
                                        <TableRow className='text-[18px] font-semibold hover:bg-transparent md:hidden'>
                                            <TableCell colSpan={2}></TableCell>
                                            <TableCell className='text-center'>
                                                Total: {formatPrice(order.totalOrderPrice)}
                                            </TableCell>
                                        </TableRow>

                                        <TableRow className='text-[18px] font-semibold hover:bg-transparent hidden md:table-row'>
                                            <TableCell colSpan={3}></TableCell>
                                            <TableCell className='text-center'>
                                                Total: {formatPrice(order.totalOrderPrice)}
                                            </TableCell>
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}