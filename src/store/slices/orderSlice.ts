import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Order {
    id: number;
    status: string;
    total: number;
    createdAt: string;
}

interface OrdersState {
    list: Order[];
}

const initialState: OrdersState = {
    list: [],
};

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {
        setOrders(state, action: PayloadAction<Order[]>) {
            state.list = action.payload;
        },
        addOrder(state, action: PayloadAction<Order>) {
            state.list.push(action.payload);
        },
    },
});

export const { setOrders, addOrder } = orderSlice.actions;
export default orderSlice.reducer;
