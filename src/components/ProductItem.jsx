import React from 'react';
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

const ProductItem = ({product}) => {

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${product.id}`}>
            <div className='overflow-hidden'>
                <img className='hover:scale-110 transition ease-in-out duration-200' src={product.image_urls[0]} alt=''/>
            </div>
            <p className='pt-3 pb-1 text-sm'>{product.name}</p>
            <p className='pt-3 pb-1 text-sm'>{product.price /100} $</p>
        </Link>
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
