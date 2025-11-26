import axiosClient from "./axiosClient";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

// ENV
const API_BACKEND = process.env.NEXT_PUBLIC_API_BACKEND_CONVERSATION;

// ================= REST API =====================

// Lấy danh sách hội thoại (INBOX)
export const getMyConversations = async (page = 0, size = 20) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND}`, {
            params: {
                page,
                size
            }
        }
        );
        return res;
    } catch (error) {
        console.error("Lỗi getMyConversations:", error);
        throw error;
    }
};

// Lấy tin nhắn trong 1 hội thoại
export const getMessagesByConversation = async (
    conversationId,
    page = 0,
    size = 20
) => {
    try {
        const res = await axiosClient.get(
            `${API_BACKEND}/${conversationId}/messages?page=${page}&size=${size}`
        );
        return res;
    } catch (error) {
        console.error("Lỗi getMessagesByConversation:", error);
        throw error;
    }
};

// Tạo hoặc tìm cuộc trò chuyện riêng tư
export const createPrivateConversation = async (otherUserId) => {
    try {
        const res = await axiosClient.post(`${API_BACKEND}/private`, {
            otherUserId,
        });
        return res;
    } catch (error) {
        console.error("Lỗi createPrivateConversation:", error);
        throw error;
    }
};

// Lấy thông tin chi tiết cuộc hội thoại
export const getConversationDetails = async (conversationId) => {
    try {
        const res = await axiosClient.get(
            `${API_BACKEND}/${conversationId}`
        );
        return res;
    } catch (error) {
        console.error("Lỗi getConversationDetails:", error);
        throw error;
    }
};

// Rời/xóa cuộc hội thoại
export const leaveConversation = async (conversationId) => {
    try {
        const res = await axiosClient.delete(
            `${API_BACKEND}/${conversationId}/leave`
        );
        return res;
    } catch (error) {
        console.error("Lỗi leaveConversation:", error);
        throw error;
    }
};

// Lấy danh sách ứng viên dành cho doanh nghiệp trong cuộc hội thoại
export const getCandidatesConversation = async (search) => {
    try {
        const res = await axiosClient.get(`${API_BACKEND}/candidates`, {
            params: { search }
        });
        return res
    } catch (error) {
        console.error("Lỗi getCandidatesConversation:", error);
        throw error;
    }
};
