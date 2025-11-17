import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import productsApi from "../api/products.js";
import cartApi from "../api/users/cart.js";
import {toast} from "react-toastify";

const Product = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [mainImage, setMainImage] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await productsApi.show(productId);
                setProduct(response.data);
                if (!isEmpty(response.data.image_urls)) {
                    setMainImage(response.data.image_urls[0]);
                }
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        if (!product) return;
        try {
            await cartApi.addToCart(product.id, quantity);
            toast.success("🛒 Item added to cart!")
        } catch (err) {
            console.error(err);
            toast.error("Something went wrong")
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading product</p>;
    if (!product) return <p>No product found.</p>;

    return (
        <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
            <div className="flex flex-col sm:flex-row gap-12">
                <div className="flex flex-col sm:flex-row flex-1 gap-3">
                    <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-auto justify-between sm:justify-start sm:w-[18%] w-full gap-2">
                        {product.image_urls.map((url, index) => (
                            <img
                                key={index}
                                src={url}
                                alt={`${product.name} ${index + 1}`}
                                onClick={() => setMainImage(url)}
                                className="w-[24%] sm:w-full cursor-pointer hover:scale-105 transition-transform duration-200 rounded"
                            />
                        ))}
                    </div>
                    <div className="w-full sm:w-[80%]">
                        <img src={mainImage} alt={product.name} className="w-full h-auto rounded" />
                    </div>
                </div>
                <div className="flex-1 flex flex-col gap-5">
                    <h1 className="text-2xl font-semibold">{product.name}</h1>
                    <p className="text-3xl font-bold">{(product.price / 100).toFixed(2)} $</p>
                    <p className="text-gray-600 md:w-3/4">{product.description}</p>
                    <div className="flex items-center gap-4 mt-4">
                        <label>
                            Quantity:
                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="ml-2 w-16 px-2 py-1 border rounded"
                            />
                        </label>
                        <button
                            onClick={handleAddToCart}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition disabled:opacity-50"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;
