import React, {useContext, useState} from 'react';
import { ShopContext } from "../../context/ShopContext.jsx";
import { assets } from "../../assets/assets.js";
import productsApi from "../../api/products.js";
import ProductItem from "../ProductItem.jsx";
import {isEmpty} from "lodash";

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [products, setProducts] = useState([]);

    const fetchData = async (apiCall, term) => {
        try {
            const response = await apiCall.index({term: term});
            setProducts(response.data.products);
        } catch (err) {
           console.log(err);
        }
    };

    const searchItem =(term) => {
        setSearch(term);

        if (!search) {
            setProducts([])
            return;
        }

        fetchData(productsApi, term);

    }
    return showSearch ? (
        <div>
            <div className='border-t border-b bg-gray-50 text-center'>
                <div
                    className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
                    <input
                        className='flex-1 outline-none bg-inherit text-sm'
                        value={search}
                        onChange={(e) => searchItem(e.target.value)}
                        type='text'
                        placeholder='Search'
                    />
                    <img src={assets.search_icon} className='w-5'/>
                </div>
                <img
                    src={assets.cross_icon}
                    className='inline w-3 cursor-pointer'
                    onClick={() => setShowSearch(false)}
                />
            </div>
            {!isEmpty(products) ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                {products.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))}
            </div>
            ) : (
            <p>No products available.</p>
            )}
        </div>
    ) : null;
};

export default SearchBar;
