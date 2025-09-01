import React, { useEffect, useState } from 'react';
import { assets } from "../assets/assets.js";
import productsApi from "../api/products.js";
import {useParams} from 'react-router-dom'
import {isEmpty} from "lodash";

const Product = () => {
    const [product, setProduct] = useState([]); // rename to productList
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const {productId} = useParams()

    const [image, setImage] = useState('');
    const [size, setSize] = useState('');

    // Set first image once productList is loaded
    useEffect(() => {
        if (!isEmpty(product)) {
            setImage(product.image_urls[0]);
        }
    }, [product]);

    useEffect(() => {
        productsApi
            .show(productId)
            .then((response) => {
                setProduct(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading products</p>;
    if (!product) return <p>No products available.</p>;

    return (
        <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
            <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
                <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
                    <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
                        {product.image_urls.map((item, index) => (
                            <img
                                onClick={() => setImage(item)}
                                src={item}
                                key={index}
                                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                            />
                        ))}
                    </div>
                    <div className='w-full sm:w-[80%]'>
                        <img className='w-full h-auto' src={image} alt='' />
                    </div>
                </div>
                <div className='flex-1'>
                    <h1 className='font-medium text-2xl mt-2'>{product.name}</h1>
                    <p className='mt-5 text-3xl font-medium'>{product.price / 100}</p>
                    <p className='mt-5 text-gray md:w-3/4'>{product.description}</p>
                    {/* ... rest of your JSX ... */}
                </div>
            </div>
        </div>
    );
};

export default Product;
