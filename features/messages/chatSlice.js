import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
    getMyConversations,
    getMessagesByConversation,
} from "@/services/chat-feature.service";

export const fetchConversations = createAsyncThunk(
    "chat/fetchConversations",
    async (_, { rejectWithValue }) => {
        try {
            const res = await getMyConversations();
            return res;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const fetchMessages = createAsyncThunk(
    "chat/fetchMessages",
    async (conversationId, { rejectWithValue }) => {
        try {
            const res = await getMessagesByConversation(conversationId);
            return { conversationId, messages: res.results };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        conversations: [],
        messages: [],
        currentConversationId: null,
        loading: false,
    },

    reducers: {
        setCurrentConversation(state, action) {
            state.currentConversationId = action.payload;
        },

        setConversations(state, action) {
            const incoming = action.payload; // 1 ConversationSummaryDTO

            const index = state.conversations.findIndex(c => c.id === incoming.id);

            let newList;
            if (index !== -1) {
                // Xóa item cũ
                newList = [...state.conversations];
                newList.splice(index, 1);
            } else {
                newList = [...state.conversations];
            }

            // Đưa lên đầu
            state.conversations = [incoming, ...newList];
        },

        // Gửi message tạm thời (trước khi server phản hồi)
        addTempMessage(state, action) {
            const msg = action.payload;
            const cId = msg.conversationId;
            if (!state.messages[cId]) state.messages[cId] = [];
            state.messages[cId].push(msg);
        },

        // WebSocket event → đẩy message vào UI
        receiveNewMessage(state, action) {
            const msg = action.payload;
            const currentUserId = msg.currentUserId;
            const cId = msg.conversationId;

            if (!state.messages[cId]) state.messages[cId] = [];

            if (msg.senderUserId !== currentUserId) {
                console.log("Received new message from others:", msg);
                state.messages[cId].push({ ...msg }); // Không có status
            }

            // Cập nhật conversation list
            const convIndex = state.conversations.findIndex(c => c.id === cId);
            if (convIndex !== -1) {
                const conv = state.conversations[convIndex];
                state.conversations.splice(convIndex, 1);
                state.conversations.unshift({ ...conv, lastMessage: msg?.content || conv.lastMessage });
            }
        },

        // Update error status khi server phản hồi
        updateMessageStatus(state, action) {
            const { conversationId, tempId, data, status } = action.payload;
            const msgs = state.messages[conversationId];
            if (!msgs) return;

            const index = msgs.findIndex(m => m.tempId === tempId);
            if (index !== -1) {
                if (status === "sent") {
                    // Thay thế message tạm thời bằng message thật từ server
                    msgs[index] = { ...data };
                } else {
                    // Gán trạng thái lỗi
                    msgs[index] = { ...msgs[index], status: "error" };
                }
                return;
            }
        },

        receiveDeleteMessage(state, action) {
            const { conversationId, messageId } = action.payload;

            const messages = state.messages[conversationId];
            const index = messages.findIndex(m => m.id === messageId);

            if (index !== -1) {
                messages[index].content = "This message has been deleted.";
            }
        },

        markConversationAsRead(state, action) {
            const id = action.payload;
            const conv = state.conversations.find(c => c.id === id);
            if (conv) {
                conv.unreadCount = 0;
            }
        }
    },

    extraReducers: (builder) => {
        builder
            // ===== fetchConversations =====
            .addCase(fetchConversations.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.conversations = action.payload.results;
                state.loading = false;
            })
            .addCase(fetchConversations.rejected, (state) => {
                state.loading = false;
            })

            // ===== fetchMessages =====
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                const { conversationId, messages } = action.payload;
                state.messages[conversationId] = messages.slice().reverse();
                state.loading = false;
            })
            .addCase(fetchMessages.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const {
    setCurrentConversation,
    receiveNewMessage,
    addTempMessage,
    updateMessageStatus,
    receiveDeleteMessage,
    setConversations,
    markConversationAsRead
} = chatSlice.actions;

export default chatSlice.reducer;
