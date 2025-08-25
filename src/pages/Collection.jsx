import React, {useEffect, useState} from 'react';
import {assets} from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
import productsApi from "../api/products";

const Collection = () => {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showFilter, setShowFilter] = useState(false);

    useEffect(() => {
        productsApi
            .index()
            .then((response) => {
                setProductList(response.data);
                setLoading(false);
                console.log(response.data, "list");
                console.log(response.data);// log the new data
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)}
                   className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`}/></p>
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Men'}/>Men
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Women'}/>Women
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Kids'}/>Kids
                        </p>
                    </div>
                </div>
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Topwear'}/>Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Bottomwear'}/>Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Winterwear'}/>Winterwear
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <div className='flex justofy-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                    <select className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                {productList.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                        {productList.map((product, index) => (
                            <ProductItem key={index} product={product} />
                        ))}
                    </div>
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    )
}
export default Collection;
