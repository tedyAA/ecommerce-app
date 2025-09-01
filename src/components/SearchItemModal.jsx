import React from 'react';
import PropTypes from "prop-types";
import ProductItem from "./ProductItem.jsx";

const ProductModal = ({ products }) => {

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
            <div
                className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 max-h-[90vh] overflow-y-auto relative">
                <button
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl font-bold"
                >
                    &times;
                </button>

                <div className="p-6">
                    {products.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                            {products.map((product) => (
                                <ProductItem key={product.id} product={product}/>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500">No products found.</p>
                    )}
                </div>

            </div>
        </div>
    );
};

ProductModal.propTypes = {
    products: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string,
        image_urls: PropTypes.arrayOf(PropTypes.string)
    })
};

export default ProductModal;
