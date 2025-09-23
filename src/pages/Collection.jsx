import React, { useEffect, useState } from 'react';
import { assets } from "../assets/assets.js";
import Title from "../components/global/Title.jsx";
import ProductItem from "../components/ProductItem.jsx";
import productsApi from "../api/products";
import typesApi from "../api/types";
import categoriesApi from "../api/categories";
import TypesFilters from "../components/filters/TypesFilters.jsx";
import CategoryFilter from "../components/filters/CategoriesFilters.jsx";
import Pagination from "../components/global/Pagination.jsx";
import LoadingProductItem from "../components/LoadingProductItem.jsx";

const Collection = () => {
    const [productList, setProductList] = useState([]);
    const [typesList, setTypesList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [showFilter, setShowFilter] = useState(false);
    const [pagination, setPagination] = useState({ current_page: 1, total_pages: 1 });

    const fetchData = async (apiCall, setter) => {
        try {
            const response = await apiCall.index();
            setter(response.data);
        } catch (err) {
            setError(err);
        }
    };

    const fetchProducts = async (page = 1) => {
        setLoading(true);
        try {
            const params = {
                page,
                per: 12,
                categories: selectedCategories.join(','),
                typeId: selectedTypes.join(','),
            };

            if (selectedCategories.length > 0) {
                params.category = selectedCategories.join(',');
            }

            if (selectedTypes.length > 0) {
                params.type = selectedTypes.join(',');
            }

            const response = await productsApi.index(params);

            setProductList(response.data.products);
            setPagination({
                current_page: response.data.current_page,
                total_pages: response.data.total_pages,
            });
        } catch (err) {
            setError(err);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 3000);
        }

    };

    useEffect(() => {
        fetchProducts(1);
    }, [selectedCategories, selectedTypes]);

    useEffect(() => {
        fetchData(categoriesApi, setCategoriesList);
        fetchData(typesApi, setTypesList);
    }, []);

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>
            <div className='min-w-60'>
                <p onClick={() => setShowFilter(!showFilter)}
                   className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
                </p>

                <CategoryFilter
                    categories={categoriesList}
                    selectedCategories={selectedCategories}
                    onChange={setSelectedCategories}
                    show={showFilter}
                />


                <TypesFilters
                    types={typesList}
                    selectedTypes={selectedTypes}
                    onChange={setSelectedTypes}
                    show={showFilter}
                />

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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {Array.from({length: 8}).map((_, i) => (
                            <LoadingProductItem key={i}/>
                        ))}
                    </div>
                ) : productList.length > 0 ? (
                    <div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
                            {productList.map((product) => (
                                <ProductItem key={product.id} product={product}/>
                            ))}
                        </div>
                        <Pagination
                            currentPage={pagination.current_page}
                            totalPages={pagination.total_pages}
                            onPageChange={(page) => fetchProducts(page)}
                        />
                    </div>
                ) : (
                    <p>No products available.</p>
                )}
            </div>
        </div>
    );
};

export default Collection;
