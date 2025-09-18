import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {assets} from "../assets/assets.js";

const ProductItem = ({product}) => {
    const productImage = () => {
        console.log(product?.image_urls?.[0]);
        return product?.image_urls?.[0] || "https://placehold.co/600x400?font=roboto";
    };
    const addToCart = async (productId, quantity = 1) => {
        const token = localStorage.getItem('auth_token');
        const response = await fetch("http://localhost:3000/api/cart_items", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ product_id: productId, quantity })
        });
        return response.json();
    };


    return (
        <div>
            <Link
                className="text-gray-700 cursor-pointer"
                to={`/product/${product.id}`}
            >
            <div className="overflow-hidden h-[390px]">
                <img
                    className="w-full h-full object-cover hover:scale-110 transition ease-in-out duration-200"
                    src={productImage()}
                    alt={product.name}
                />
            </div>
            </Link>
            <div className="flex justify-between items-center">
                <div>
                    <p className="pt-3 pb-1 text-sm">{product.name}</p>
                    <p className="pt-3 pb-1 text-sm">{product.price / 100} $</p>
                </div>
                <img src={assets.cart_icon} onClick={() => addToCart(product.id)} className="w-[20px] h-[20px]"/>
            </div>
        </div>
)
}

ProductItem.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        price: PropTypes.number,
        category: PropTypes.shape({
            name: PropTypes.string
        }),
        image_urls: PropTypes.arrayOf(PropTypes.string)
    })
};

export default ProductItem;
