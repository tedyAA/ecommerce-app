import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    token: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
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
    phone: null,
    createdAt: null,
    id: null,
    avatar_url: null,
    isAuthenticated: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login(state, action: PayloadAction<{ token: string; email: string; firstName: string, lastName: string, phone:string, createdAt: string, id: string, avatar_url: string }>) {
            state.token = action.payload.token;
            state.email = action.payload.email;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            state.phone = action.payload.phone;
            state.createdAt = action.payload.createdAt;
            state.id = action.payload.id;
            state.avatar_url = action.payload.avatar_url;
            state.isAuthenticated = true;
        },
        logout(state) {
            state.token = null;
            state.email = null;
            state.firstName = null;
            state.lastName = null;
            state.phone = null;
            state.createdAt = null;
            state.id = null;
            state.avatar_url = null;
            state.isAuthenticated = false;
        },
    },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
