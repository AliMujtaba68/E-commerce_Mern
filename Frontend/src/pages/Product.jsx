import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
    const { productId } = useParams();
    const { products, currency, addToCart } = useContext(ShopContext);

    const [productData, setProductData] = useState(null);
    const [image, setImage] = useState('');
    const [size, setSize] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    const [showSizeError, setShowSizeError] = useState(false);

    const fetchProductData = () => {
        const product = products.find((item) => item._id === productId);
        if (product) {
            setProductData(product);
            setImage(product.image[0]);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [productId]);

    const handleAddToCart = () => {
        if (productData.sizes && productData.sizes.length > 0 && !size) {
            setShowSizeError(true);
            return;
        }
        setShowSizeError(false);
        addToCart(productData._id, size || null);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
    };

    return productData ? (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            {/* Product Data */}
            <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row">
                {/* Product Images */}
                <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full">
                        {productData.image.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                                alt=""
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img className="w-full h-auto" src={image} alt="" />
                    </div>
                </div>

                {/* Product Info */}
                <div className="flex-1">
                    <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
                    <div className="flex items-center gap-1 mt-2">
                        {[...Array(4)].map((_, idx) => (
                            <img key={idx} src={assets.star_icon} alt="" className="w-3.5" />
                        ))}
                        <img src={assets.star_dull_icon} alt="" className="w-3.5" />
                        <p className="pl-2">(122)</p>
                    </div>
                    <p className="mt-5 text-3xl font-medium">
                        {currency}
                        {productData.price}
                    </p>
                    <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>

                    {/* Conditionally Render Size Selection */}
                    {productData.sizes && productData.sizes.length > 0 && (
                        <div className="flex flex-col gap-4 my-8">
                            <p>Select Size</p>
                            <div className="flex gap-2">
                                {productData.sizes.map((item, index) => (
                                    <button
                                        onClick={() => setSize(item)}
                                        className={`border py-2 px-4 bg-gray-100 ${
                                            item === size ? 'border-orange-500' : ''
                                        }`}
                                        key={index}
                                    >
                                        {item}
                                    </button>
                                ))}
                            </div>
                            {showSizeError && <p className="text-red-500 text-sm">Please select a size.</p>}
                        </div>
                    )}

                    <button
                        onClick={handleAddToCart}
                        className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
                    >
                        ADD TO CART
                    </button>
                    <hr className="mt-8 sm:w-4/5" />
                    <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
                        <p>100% Original product.</p>
                        <p>Cash on delivery is available on this product.</p>
                        <p>Easy return and exchange policy within 7 days.</p>
                    </div>
                </div>
            </div>

            {/* Pop-Up Notification */}
            {showPopup && (
                <div className="fixed top-5 right-5 bg-black text-white p-4 rounded shadow-md z-50">
                    Product added to cart!
                </div>
            )}

            {/* Description and Review Section */}
            <div className="mt-20">
                <div className="flex">
                    <b className="border px-5 py-3 text-sm">Description</b>
                    <p className="border px-5 py-3 text-sm">Reviews (122)</p>
                </div>
                <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500">
                    <p>
                        E-commerce has revolutionized the way people shop by providing a vast online marketplace accessible
                        anytime, anywhere. From fashion and electronics to groceries and services, customers can browse,
                        compare, and purchase products effortlessly. With secure payment methods and fast shipping options,
                        e-commerce offers a seamless and convenient shopping experience. It enables businesses to reach a
                        global audience, helping them grow and adapt in today's digital age.
                    </p>
                </div>
            </div>

            {/* Display Related Products */}
            <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
        </div>
    ) : (
        <div className="opacity-0"></div>
    );
};

export default Product;
