"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { addTempMessage, receiveDeleteMessage, receiveNewMessage, updateMessageStatus } from "@/features/messages/chatSlice";

/**
 * useWebSocket hook
 * @param {string} token accessToken của người dùng sẽ tự động được truyền trong cookie
 * @param {Array<number>} conversationIds danh sách conversationId để subscribe
 */
export const useWebSocket = (token = "", conversationIds = []) => {
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.auth);
    const stompClientRef = useRef(null);
    const subscriptionRefs = useRef([]);

    // 1. Kết nối WebSocket CHỈ 1 LẦN
    useEffect(() => {
        if (typeof window === "undefined") return;

        const socket = new SockJS(
            `${process.env.NEXT_PUBLIC_API_BACKEND_WS}/ws`,
            null,
            { withCredentials: true }
        );

        const client = new Client({
            webSocketFactory: () => socket,
            // connectHeaders: { Authorization: `Bearer ${token}` },
            connectHeaders: {},
            debug: () => { },
        });

        client.onConnect = () => {
            console.log("WebSocket đã kết nối");

            // SUBSCRIBE queue receipts (message gửi thành công)
            const subReceipt = client.subscribe("/user/queue/receipts", (msg) => {
                const body = JSON.parse(msg.body);

                dispatch(
                    updateMessageStatus({
                        conversationId: body.conversationId,
                        tempId: body.tempId,
                        data: body.data,
                        status: "sent",
                    })
                );
            });

            // SUBSCRIBE queue errors (message lỗi)
            const subError = client.subscribe("/user/queue/errors", (msg) => {
                const body = JSON.parse(msg.body);

                dispatch(
                    updateMessageStatus({
                        conversationId: body.conversationId,
                        tempId: body.tempId,
                        status: "error",
                    })
                );
            });

            // Lưu subscription để cleanup sau này
            subscriptionRefs.current.push(subReceipt, subError);
        };

        client.activate();
        stompClientRef.current = client;

        return () => {
            client.deactivate();
            stompClientRef.current = null;
        };
    }, [token]); // chỉ phụ thuộc vào token


    // 2. SUBSCRIBE khi conversationId thay đổi
    useEffect(() => {
        const client = stompClientRef.current;
        if (!client || !client.connected) return;

        // Hủy subscribe cũ
        subscriptionRefs.current.forEach((sub) => sub.unsubscribe());
        subscriptionRefs.current = [];

        // Subscribe mới
        conversationIds.forEach((id) => {
            const sub = client.subscribe(`/topic/conversation/${id}`, (msg) => {
                const body = JSON.parse(msg.body);

                switch (body.eventType) {
                    case "NEW_MESSAGE":
                        dispatch(
                            receiveNewMessage({
                                ...body.data,
                                currentUserId: account.id,
                            })
                        );
                        break;

                    case "DELETE_MESSAGE":
                        dispatch(
                            receiveDeleteMessage({
                                conversationId: id,
                                messageId: body.data.messageId,
                            })
                        );
                        break;

                    case "READ_RECEIPT":
                        dispatch(
                            markConversationAsRead({
                                conversationId: id,
                            })
                        );
                        break;

                    default:
                        console.warn("Unknown WS event:", body);
                }
            });

            subscriptionRefs.current.push(sub);
        });


        return () => {
            // cleanup khi list conversationIds thay đổi
            subscriptionRefs.current.forEach((sub) => sub.unsubscribe());
            subscriptionRefs.current = [];
        };
    }, [conversationIds]);

    // Hàm gửi message
    const sendMessage = (payload) => {
        if (!stompClientRef.current) return;
        // Tạo tempId bằng UUID
        const tempId = crypto.randomUUID();

        const finalPayload = {
            ...payload,
            tempId,            // gán tempId
        };

        // Add message tạm vào UI
        addTempMessage({
            ...finalPayload,
            status: "sending",
        });

        // Gửi vào server
        stompClientRef.current.publish({
            destination: "/app/chat.sendMessage",
            body: JSON.stringify(finalPayload),
        });
    };

    const deleteMessage = (payload) => {
        if (!stompClientRef.current) return;
        stompClientRef.current.publish({
            destination: "/app/chat.deleteMessage",
            body: JSON.stringify(payload),
        });
    };

    const markAsRead = (payload) => {
        if (!stompClientRef.current) return;
        stompClientRef.current.publish({
            destination: "/app/chat.markAsRead",
            body: JSON.stringify(payload),
        });
    };

    return { sendMessage, deleteMessage, markAsRead };
};
