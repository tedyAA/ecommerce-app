import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ordersApi from "../../api/orders";

export interface Order {
    id: number;
    status: string;
    total: number;
    created_at: string;
    total_cents: number
}

interface OrdersState {
    list: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    list: [],
    loading: false,
    error: null,
};

export const fetchOrders = createAsyncThunk<Order[]>(
    "orders/fetchOrders",
    async (_, { rejectWithValue }) => {
        try {
            const response = await ordersApi.getUserOrders();
            return response.data as Order[];
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export default orderSlice.reducer;
