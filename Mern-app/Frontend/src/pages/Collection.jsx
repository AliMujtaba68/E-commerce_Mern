import React, { useEffect, useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';

import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {

    const { products } = useContext(ShopContext);
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);
    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relavent');


    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setCategory(prev => [...prev, e.target.value]);
        }
    };

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value));
        } else {
            setSubCategory(prev => [...prev, e.target.value]);
        }
    };

    const applyFilter = () => {
        console.log("Selected Categories:", category);
        console.log("Selected SubCategories:", subCategory);

        // Copy of products for filtering
        const filtered = products.filter(item => {
            // Normalize category and subCategory values to lowercase for comparison
            const itemCategory = item.category?.toLowerCase();
            const itemSubCategory = item.subCategory?.toLowerCase();

            const selectedCategories = category.map(cat => cat.toLowerCase());
            const selectedSubCategories = subCategory.map(subCat => subCat.toLowerCase());

            // Check if product matches any selected category and subcategory
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(itemCategory);
            const matchesSubCategory = selectedSubCategories.length === 0 || selectedSubCategories.includes(itemSubCategory);

            // Log matching criteria for each product
            console.log("Product:", item.name);
            console.log("Matches Category:", matchesCategory);
            console.log("Matches SubCategory:", matchesSubCategory);

            return matchesCategory && matchesSubCategory;
        });

        console.log("Filtered Products:", filtered);
        setFilterProducts(filtered);
    };


    const sortProduct = () => {

        let fpCopy = filterProducts.slice();

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
                break;

            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
                break;

            default:
                applyFilter();
                break;

        }
    }

    useEffect(() => {
        applyFilter();
    }, [category, subCategory]);

    useEffect(() => {
        sortProduct();
    }, [sortType]);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

            {/* Filter Options */}
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} src={assets.dropdown_icon} alt="" />
                </p>

                {/* Category Filter */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden sm:block'}`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'MEN'} onChange={toggleCategory} />Men
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'WOMEN'} onChange={toggleCategory} />Women
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'KIDS'} onChange={toggleCategory} />Kids
                        </p>
                    </div>
                </div>

                {/* SubCategory Filter */}
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden sm:block'}`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input className='w-3' type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />Winterwear
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    {/* Product Sort */}
                    <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relavent">Sort by: Relavent</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {/* Map Products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem key={index} name={item.name} id={item._id} price={item.price} image={item.image} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Collection;
