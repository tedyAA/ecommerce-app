import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Category {
    id: number;
    name: string;
    description: string | null;
}

export interface Type {
    id: number;
    name: string;
    description: string | null;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category_id: number;
    type_id: number;
    created_at: string;
    updated_at: string;
    bestseller: boolean;
    category: Category;
    type: Type;
    image_urls: string[];
}

interface ProductState {
    products: Product[];
}

const initialState: ProductState = {
    products: [],
};

const productSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts(state, action: PayloadAction<Product[]>) {
            state.products = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
