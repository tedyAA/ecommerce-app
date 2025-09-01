import React from "react";
import PropTypes from "prop-types";

const CategoryFilter = ({ categories, selectedCategories, onChange, show = true }) => {
    if (!categories || categories.length === 0) return null;

    const handleToggle = (id) => {
        if (selectedCategories.includes(id)) {
            onChange(selectedCategories.filter(categoryId => categoryId !== id));
        } else {
            onChange([...selectedCategories, id]);
        }
    };

    return (
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${show ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {categories.map(category => (
                    <label key={category.id} className='flex gap-2 items-center cursor-pointer'>
                        <input
                            type="checkbox"
                            className='w-3 h-3'
                            checked={selectedCategories.includes(category.id)}
                            onChange={() => handleToggle(category.id)}
                        />
                        {category.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

CategoryFilter.propTypes = {
    categories: PropTypes.array.isRequired,
    selectedCategories: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    show: PropTypes.bool
};

export default CategoryFilter;
