import React, {useContext, useEffect, useState} from 'react';
import {ShopContext} from "../context/ShopContext.jsx";
import {assets} from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
import productsApi from "../api/products";

const Collection = () => {

    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const {products, search, showSearch} = useContext(ShopContext)
    const [showFilter, setShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([]);

    const [category, setCategory] = useState([]);
    const [subCategory, setSubCategory] = useState([]);
    const [sortType, setSortType] = useState('relevant');

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
        console.log(category);
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    const applyFilter = () => {

        let productsCopy = products.slice()

        if (showSearch && search) {
            productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
        }

        if (category.length > 0) {
            productsCopy = productsCopy.filter(product => category.includes(product.category))
        }

        if (subCategory.length > 0) {
            productsCopy = productsCopy.filter(product => subCategory.includes(product.subCategory))
        }

        setFilterProducts(productsCopy)
    }

    const sortProduct = () => {

        let fpCopy = products.slice()

        switch (sortType) {
            case 'low-high':
                setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)))
                break;
            case 'high-low':
                setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)))
                break;
            default:
                applyFilter()
                break;
        }
    }

    useEffect(() => {
        applyFilter()
    }, [category, subCategory, search, showSearch]);

    useEffect(() => {
        sortProduct()
    }, [sortType]);

    useEffect(() => {
        productsApi
            .index()
            .then((response) => {
                setProductList(response.data); // set data to state
                setLoading(false);
                console.log(productList);
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
                            <input type={"checkbox"} className='w-3' value={'Men'} onChange={toggleCategory}/>Men
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Women'} onChange={toggleCategory}/>Women
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Kids'} onChange={toggleCategory}/>Kids
                        </p>
                    </div>
                </div>
                <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>
                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Topwear'} onChange={toggleSubCategory}/>Topwear
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}/>Bottomwear
                        </p>
                        <p className='flex gap-2'>
                            <input type={"checkbox"} className='w-3' value={'Winterwear'} onChange={toggleSubCategory}/>Winterwear
                        </p>
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <div className='flex justofy-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                    <select className='border-2 border-gray-300 text-sm px-2'
                            onChange={(e) => setSortType(e.target.value)}>
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>
                <div className={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'}>
                    {filterProducts.map((product, index) => (
                        <ProductItem key={index} image={product.image} name={product.name} id={product._id}
                                     price={product.price}/>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default Collection;
