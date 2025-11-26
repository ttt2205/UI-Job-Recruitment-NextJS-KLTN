import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "@/services/axiosClient";
import { getJobNotificationsByUserId } from "@/services/notification-feature.service";

// ==============================================
// 1) ASYNC THUNK: Lấy danh sách job notifications
// ==============================================
export const getJobNotificationsByUserIdThunk = createAsyncThunk(
    "notifications/getJobNotifications",
    async (userId, thunkAPI) => {
        try {
            const res = await getJobNotificationsByUserId(userId);
            return res;
        } catch (err) {
            return thunkAPI.rejectWithValue(err.response?.data || "Error");
        }
    }
);

// ==============================================
// 2) SLICE
// ==============================================
const notificationsSlice = createSlice({
    name: "notifications",
    initialState: {
        notifications: [],  // danh sách tất cả thông báo
        loading: false,
        error: null,
        unreadCount: 0,
    },

    reducers: {
        // Thêm 1 thông báo mới (push từ WebSocket)
        addNewNotification: (state, action) => {
            state.notifications.unshift(action.payload); // ưu tiên hiện thông báo mới lên đầu
            state.unreadCount += 1;
        },

        // Mark tất cả là đã đọc
        markAllRead: (state) => {
            state.unreadCount = 0;
            state.notifications = state.notifications.map(n => ({
                ...n,
                isRead: true,
            }));
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getJobNotificationsByUserIdThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getJobNotificationsByUserIdThunk.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.statusCode === 200) {
                    state.notifications = action.payload.results || [];
                    state.unreadCount = action.payload.results.filter(n => !n.isRead).length;
                }
            })
            .addCase(getJobNotificationsByUserIdThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Failed to load notifications";
            });
    }
});

export const { addNewNotification, markAllRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;
