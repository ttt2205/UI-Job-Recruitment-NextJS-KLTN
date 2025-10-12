// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, getAccount, logout as logoutApi } from "@/services/auth-feature.service";

// Async thunk để gọi API lấy thông tin người dùng
export const fetchUserInfo = createAsyncThunk(
    "auth/fetchUserInfo",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getAccount();
            console.log("getAccount: ", res.data)
            return res.data;
        } catch (err) {
            if (err.response && err.response.status === 401) {
                // Token hết hạn
                return rejectWithValue("Unauthorized");
            }
            return rejectWithValue("Unknown error");
        }
    }
);

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { dispatch, rejectWithValue }) => {
        try {
            const res = await loginApi(email, password);

            if (res?.success) {
                // Fetch user info sau khi có token
                dispatch(fetchUserInfo());
            }

            return res.message;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Login failed");
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await logoutApi(); // gọi API logout nếu cần
            return res?.message | "Logout success";
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        account: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserInfo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserInfo.fulfilled, (state, action) => {
                console.log("action.payload: ", action.payload)
                state.account = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserInfo.rejected, (state, action) => {
                state.loading = false;
                if (action.payload === "Unauthorized") {
                    // Xử lý khi token hết hạn
                    state.account = null;
                }
            })
            // loginUser
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            })

            // logoutUser
            .addCase(logout.pending, (state) => {
                state.loading = true;
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.account = null;
                state.loading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false;
            });
    }
});

export const { } = authSlice.actions;
export default authSlice.reducer;
