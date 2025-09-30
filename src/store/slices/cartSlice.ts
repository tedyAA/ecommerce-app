import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_urls: string[];
}

interface CartItem {
    id: number;
    product: Product;
    quantity: number;
}

interface CartState {
    id: number | null;
    user_id: number | null;
    items: CartItem[];
}

const initialState: CartState = {
    id: null,
    user_id: null,
    items: [],
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCart(state, action: PayloadAction<any>) {
            const cart = action.payload;
            state.id = cart.id;
            state.user_id = cart.user_id;
            state.items = cart.cart_items.map((ci: { id: any; quantity: any; product: any; }) => ({
                id: ci.id,
                quantity: ci.quantity,
                product: ci.product,
            }));
        },

        updateQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
            const item = state.items.find((i) => i.id === action.payload.id);
            if (item) item.quantity = action.payload.quantity;
        },

        addItem(state, action: PayloadAction<CartItem>) {
            const existing = state.items.find((i) => i.id === action.payload.id);
            if (existing) {
                existing.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },

        removeItem(state, action: PayloadAction<number>) {
            state.items = state.items.filter((i) => i.id !== action.payload);
        },

        clearCart(state) {
            state.id = null;
            state.user_id = null;
            state.items = [];
        },
    },
});

export const selectCartCount = (state: { cart: CartState }) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const { setCart, updateQuantity, addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
