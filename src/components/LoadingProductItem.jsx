import React from "react";

const LoadingProductItem = () => {
    return (
        <div className="border rounded-lg p-2 animate-pulse">
            <div className="bg-gray-300 h-[250px] w-full mb-2 rounded-md"></div>
            <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            <div className="flex justify-end mt-2">
                <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
            </div>
        </div>
    );
};

export default LoadingProductItem;
