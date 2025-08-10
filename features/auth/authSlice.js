// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login as loginApi, getAccount } from "@/services/auth-feature.service";

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
            const accessToken = res.data?.accessToken;

            if (accessToken) {
                // Lưu vào localStorage
                localStorage.setItem("accessToken", accessToken);

                // Lưu vào cookie nếu muốn (cần cài thư viện js-cookie)
                document.cookie = `accessToken=${accessToken}; path=/;`;
                dispatch(setToken(accessToken));
                // Fetch user info sau khi có token
                dispatch(fetchUserInfo());
            }

            return accessToken;
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message || "Login failed");
        }
    }
);



const authSlice = createSlice({
    name: "auth",
    initialState: {
        account: null,
        token: null,
        loading: false,
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("accessToken", action.payload);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("accessToken");
        },
    },
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
                    state.token = null;
                    localStorage.removeItem("accessToken");
                }
            })
            // loginUser
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.accessToken;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
            });
    }
});

export const { setToken, logout } = authSlice.actions;
export default authSlice.reducer;
