import React from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { assets } from "../assets/assets.js";
import cartApi from "../api/users/cart.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ProductItem = ({ product }) => {
    const cartItems = useSelector((state) => state.cart.items);

    const isInCart = cartItems?.some(item => item.product.id === product.id);

    const productImage = () => {
        return product?.image_urls?.[0] || "https://placehold.co/600x400?font=roboto";
    };

    const handleAddToCart = (productId) => {
        if (isInCart) {
            toast.info("Already in your cart!");
            return;
        }

        cartApi.addToCart(productId)
            .then(res => toast.success("🛒 Item added to cart!"))
            .catch(err => toast.error("❌ Something went wrong", err));
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

                {/* 👇 Switch icon based on cart state */}
                <img
                    src={isInCart ? assets.check_icon : assets.cart_icon}
                    onClick={() => handleAddToCart(product.id)}
                    className={`w-[20px] h-[20px] cursor-pointer transition ${
                        isInCart ? "opacity-80" : "hover:scale-110"
                    }`}
                    alt={isInCart ? "In cart" : "Add to cart"}
                />
            </div>
        </div>
    );
};

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
