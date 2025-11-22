// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, getAccount, logout as logoutApi } from "@/services/auth-feature.service";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

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
            return res;
        } catch (err) {
            return rejectWithValue(err.response.data || "Logout failed");
        }
    }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        account: null,
        loading: false,
        accessToken: ""
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
                state.accessToken = Cookies.get("accessToken");
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
                toast.success(action.payload || "Đăng xuất thành công!");
                state.loading = false;
            })
            .addCase(logout.rejected, (state, action) => {
                toast.error(action.payload?.message || "Đăng xuất thất bại!");
                state.loading = false;
            });
    }
});

export const { } = authSlice.actions;
export default authSlice.reducer;
