import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import auth from "../../api/users/auth";

interface UserState {
    token: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phoneNumber: string | null;
    createdAt: string | null;
    id: string | null;
    avatar_url: string | null;
    isAuthenticated: boolean;
}

const initialState: UserState = {
    token: null,
    email: null,
    firstName: null,
    lastName: null,
    phoneNumber: null,
    createdAt: null,
    id: null,
    avatar_url: null,
    isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk(
    "user/fetchCurrentUser",
    async (_, { rejectWithValue }) => {
        try {
            const response = await auth.current();
            return response;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(
            state,
            action: PayloadAction<{
                token: string;
                email: string;
                firstName: string;
                lastName: string;
                phoneNumber: string;
                createdAt: string;
                id: string;
                avatar_url: string;
            }>
        ) {
            Object.assign(state, action.payload, { isAuthenticated: true });
        },
        logout(state) {
            Object.assign(state, initialState);
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            const user = action.payload;
            state.email = user.email;
            state.firstName = user.first_name;
            state.lastName = user.last_name;
            state.phoneNumber = user.phone || null;
            state.createdAt = user.created_at;
            state.id = user.id;
            state.avatar_url = user.avatar_url || null;
            state.isAuthenticated = true;
        });
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            Object.assign(state, initialState);
        });
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
