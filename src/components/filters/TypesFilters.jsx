import React from "react";
import PropTypes from "prop-types";

const TypeFilter = ({ types, selectedTypes, onChange, show = true }) => {
    if (!types || types.length === 0) return null;

    const handleToggle = (id) => {
        if (selectedTypes.includes(id)) {
            onChange(selectedTypes.filter(typeId => typeId !== id));
        } else {
            onChange([...selectedTypes, id]);
        }
    };

    return (
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${show ? '' : 'hidden'} sm:block`}>
            <p className='mb-3 text-sm font-medium'>TYPE</p>
            <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                {types.map(type => (
                    <label key={type.id} className='flex gap-2 items-center cursor-pointer'>
                        <input
                            type="checkbox"
                            className='w-3 h-3'
                            checked={selectedTypes.includes(type.id)}
                            onChange={() => handleToggle(type.id)}
                        />
                        {type.name}
                    </label>
                ))}
            </div>
        </div>
    );
};

TypeFilter.propTypes = {
    types: PropTypes.array.isRequired,
    selectedTypes: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    show: PropTypes.bool
};

export default TypeFilter;
