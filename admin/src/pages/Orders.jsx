import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const Orders = ({ token }) => {

    const [orders, setOrders] = useState([])

    const fetchAllOrders = async () => {

        if (!token) {
            return null
        }

        try {

            const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } })
            if (response.data.success) {
                setOrders(response.data.orders)
            }
            else {
                toast.error(response.data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    const statusHandler = async (event, orderId) => {
        const newStatus = event.target.value;

        // Update the state directly for immediate feedback
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order._id === orderId ? { ...order, status: newStatus } : order
            )
        );

        try {
            // Sync the new status with the backend
            const response = await axios.post(
                backendUrl + '/api/order/status', // Ensure the URL is correct
                { orderId, status: newStatus },   // Pass the correct data
                { headers: { token } }            // Include authorization header
            );

            if (response.data.success) {
                // Optionally re-fetch all orders if needed
                await fetchAllOrders();
            } else {
                toast.error(response.data.message); // Display an error message if the update fails
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to update status'); // Display an error message on exception
        }
    };


    useEffect(() => {
        fetchAllOrders()
    }, [token])

    return (
        <div>
            <h3>Order Page</h3>
            <div>
                {
                    orders.map((order, index) => (
                        <div className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-gray-200p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-gray-700' key={index}>
                            <img className='w-12' src={assets.parcel_icon} alt="" />
                            <div>
                                <div>
                                    {order.items.map((item, index) => {

                                        if (index === order.items.length - 1) {
                                            return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> </p>
                                        }
                                        else {
                                            return <p className='py-0.5' key={index}>{item.name} x {item.quantity} <span>{item.size}</span> ,</p>

                                        }
                                    })}
                                </div>

                                <p className='mt-3 mb-2 font-medium'>{order.address.firstName + " " + order.address.lastName}</p>
                                <div>
                                    <p>{order.address.street + ","}</p>
                                    <p>{order.address.city + ", " + order.address.state + ", " + order.address.country + ", " + order.address.zipcode}</p>
                                </div>
                                <p>{order.address.phone}</p>
                            </div>

                            <div>

                                <p className='text-sm sm:text-[15px]'>Items : {order.items.length}</p>
                                <p className='mt-3'>Method : {order.paymentMethod}</p>
                                <p>Payment : {order.payment ? 'Done' : 'Pending'}</p>
                                <p>Date : {new Date(order.date).toLocaleDateString()}</p>

                            </div>

                            <p className='text-sm sm:text-[15px]'>{currency}{order.amount}</p>
                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='p-2 font-semibold'>
                                <option value="Order Placed">Order Placed</option>
                                <option value="Packing">Packing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Out for delivery">Out for delivery</option>
                                <option value="Delivered">Delivered</option>
                            </select>

                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Orders
