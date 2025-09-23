import React, { useEffect, useState} from 'react';
import Title from "./global/Title.jsx";
import ProductItem from "./ProductItem.jsx";
import productsApi from "../api/products.js";

const BestSeller = () => {

    const [bestSeller, setBestSeller] = useState([]);
    const [loading, setLoading] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        productsApi
            .index({bestseller: true, per: 5, random:true})
            .then((response) => {
                setBestSeller(response.data.products);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
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
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
                {bestSeller.map((product, index) => (
                    <ProductItem key={index} product={product}/>
                ))}
            </div>
        </div>
    )
}
export default BestSeller;
