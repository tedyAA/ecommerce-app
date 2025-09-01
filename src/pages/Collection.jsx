import React, { useEffect, useState } from 'react';
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
import productsApi from "../api/products";
import typesApi from "../api/types";
import categoriesApi from "../api/categories";

const Collection = () => {
    const [productList, setProductList] = useState([]);
    const [typesList, setTypesList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showFilter, setShowFilter] = useState(false);

    // Generic fetch function
    const fetchData = async (apiCall, setter) => {
        try {
            const response = await apiCall.index();
            setter(response.data);
        } catch (err) {
            setError(err);
        }
    };

    // Fetch products based on selected filters
    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                categories: selectedCategories.join(','),
                typeId: selectedTypes.join(','),
            };

            console.log(params);
            const response = await productsApi.index(params);
            setProductList(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [selectedCategories, selectedTypes]);

    useEffect(() => {
        fetchData(categoriesApi, setCategoriesList);
        fetchData(typesApi, setTypesList);
    }, []);

    const toggleSelection = (item, listSetter, listState) => {
        listSetter(
            listState.includes(item)
                ? listState.filter(i => i !== item)
                : [...listState, item]
        );
    };

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)}
                   className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
                </p>

                {categoriesList.length > 0 && (
                    <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                        <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                            {categoriesList.map(cat => (
                                <label key={cat.id} className='flex gap-2 items-center cursor-pointer'>
                                    <input
                                        type="checkbox"
                                        className='w-3 h-3'
                                        checked={selectedCategories.includes(cat.id)}
                                        onChange={() => {
                                            setSelectedCategories(prev =>
                                                prev.includes(cat.id)
                                                    ? prev.filter(id => id !== cat.id)
                                                    : [...prev, cat.id]
                                            );
                                        }}
                                    />
                                    {cat.name}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {typesList.length > 0 && (
                    <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
                        <p className='mb-3 text-sm font-medium'>TYPE</p>
                        <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                            {typesList.map(type => (
                                <p key={type.id} className='flex gap-2'>
                                    <input
                                        type="checkbox"
                                        className='w-3'
                                        checked={selectedTypes.includes(type.id)}
                                        onChange={() => toggleSelection(type.id, setSelectedTypes, selectedTypes)}
                                    />
                                    {type.name}
                                </p>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />
                    <select className='border-2 border-gray-300 text-sm px-2'>
                        <option value="relevant">Sort by: Relevant</option>
                        <option value="low-high">Sort by: Low to High</option>
                        <option value="high-low">Sort by: High to Low</option>
                    </select>
                </div>

                {loading ? (
                    <p>Loading products...</p>
                ) : productList.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                        {productList.map((product) => (
                            <ProductItem key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Collection;
