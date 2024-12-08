import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
    const { products, currency, cartItems, updateQuantity } = useContext(ShopContext);
    const [cartData, setCartData] = useState([]);
    const [popUpMessage, setPopUpMessage] = useState(''); // State for the pop-up message
    const navigate = useNavigate();  // Initialize navigate from useNavigate()

    useEffect(() => {
        if (products.length > 0) {
            const tempData = [];
            for (const itemId in cartItems) {
                for (const size in cartItems[itemId]) {
                    if (cartItems[itemId][size] > 0) {
                        tempData.push({
                            _id: itemId,
                            size: size,
                            quantity: cartItems[itemId][size],
                        });
                    }
                }
            }
            setCartData(tempData);
        }
    }, [cartItems, products]);

    // Function to handle removal with pop-up
    const handleRemove = (productId, size) => {
        updateQuantity(productId, size, 0);
        setPopUpMessage('Removed from Cart'); // Set the pop-up message
        setTimeout(() => setPopUpMessage(''), 3000); // Clear the message after 3 seconds
    };

    return (
        <div className='border-t pt-14 relative'>
            <div className='text-2xl mb-3'>
                <Title text1={'YOUR'} text2={'CART'} />
            </div>

            {/* Pop-up Message */}
            {popUpMessage && (
                <div className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded shadow-lg z-50">
                    {popUpMessage}
                </div>
            )}

            <div>
                {cartData.length > 0 ? (
                    cartData.map((item, index) => {
                        const productData = products.find((product) => product._id === item._id);
                        return productData ? (
                            <div
                                key={index}
                                className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'
                            >
                                <div className='flex items-start gap-6'>
                                    <img
                                        className='w-16 sm:w-20'
                                        src={productData.image[0]}
                                        alt={productData.name}
                                    />
                                    <div>
                                        <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                                        <div className='flex items-center gap-5 mt-2'>
                                            <p>{currency}{productData.price}</p>
                                            <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>
                                                {item.size}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <input
                                    onChange={(e) =>
                                        e.target.value === '' || e.target.value === '0'
                                            ? null
                                            : updateQuantity(item._id, item.size, Number(e.target.value))
                                    }
                                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1'
                                    type="number"
                                    min={1}
                                    defaultValue={item.quantity}
                                />
                                <img
                                    onClick={() => handleRemove(item._id, item.size)}
                                    className='w-4 mr-4 sm:w-5 cursor-pointer'
                                    src={assets.bin_icon}
                                    alt="Remove"
                                />
                            </div>
                        ) : null;
                    })
                ) : (
                    <p className="text-center text-xl text-gray-600">Your cart is empty.</p>
                )}
            </div>

            <div className='flex justify-end my-20'>
                <div className='w-full sm:w-[450px]'>
                    <CartTotal />
                    <div className='w-full text-end'>
                        <button
                            onClick={() => navigate('/place-order')}
                            className='bg-black text-white text-sm my-8 px-8 py-3'
                        >
                            Proceed To Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
