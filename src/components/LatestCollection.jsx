import React, { useEffect, useState } from 'react';
import Title from "./global/Title.jsx";
import ProductItem from "./ProductItem.jsx";
import productsApi from "../api/products.js";
import LoadingProductItem from "./LoadingProductItem.jsx";

const LatestCollection = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        productsApi.index({ per: 5 })
            .then(res => setProducts(res.data.products))
            .catch(console.error)
            .finally(() => {
                // Timeout is used to keep the loading component visible for demonstration purposes
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            });

    }, []);

    return (
        <div className='my-10'>
            <div className='text-center py-8 text-3xl'>
                <Title text1='LATEST' text2='COLLECTION'/>
                <p className='w-3/4 mx-auto text-xs sm:text-sm md:text-base text-center text-gray-600'>
                    Lorem Ipsum is a simply dummy text of the printing and typesetting industry.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {loading
                    ? Array.from({length: 5}).map((_, i) => (
                        <LoadingProductItem key={i}/>
                    ))
                    : products.map((product) => (
                        <ProductItem product={product} key={product.id}/>
                    ))}
            </div>
        </div>
    );
};

export default LatestCollection;
