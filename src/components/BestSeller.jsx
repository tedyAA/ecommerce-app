import React, { useEffect, useState} from 'react';
import Title from "./global/Title.jsx";
import ProductItem from "./ProductItem.jsx";
import productsApi from "../api/products.js";
import LoadingProductItem from "./LoadingProductItem.jsx";

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([]);
    const [loading, setLoading] = useState([true]);
    const [error, setError] = useState([]);

    useEffect(() => {
        productsApi
            .index({bestseller: true, per: 5, random:true})
            .then((response) => {
                setBestSeller(response.data.products);
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false);
                }, 3000);
            });
    }, []);

    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1='BEST' text2='SELLERS'/>
                <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {loading
                    ? Array.from({length: 5}).map((_, i) => (
                        <LoadingProductItem key={i}/>
                    ))
                    : bestSeller.map((product) => (
                        <ProductItem product={product} key={product.id}/>
                    ))}
            </div>
        </div>
    )
}
export default BestSeller;
