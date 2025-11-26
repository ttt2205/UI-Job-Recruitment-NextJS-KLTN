"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import {
    addTempMessage,
    markConversationAsRead,
    receiveDeleteMessage,
    receiveNewMessage,
    updateMessageStatus,
} from "@/features/messages/chatSlice";
import { addNewNotification } from "@/features/notification/notificationSlice";

/**
 * useWebSocket hook
 * @param {string} token accessToken của người dùng sẽ tự động được truyền trong cookie
 */
export const useWebSocket = (token = "") => {
    const dispatch = useDispatch();
    const { account } = useSelector((state) => state.auth);
    const { currentConversationId } = useSelector((state) => state.chat);
    const [conversationIds, setConversationIds] = useState([]);

    const stompClientRef = useRef(null);
    const systemSubscriptionRefs = useRef([]);
    const conversationSubscriptionRefs = useRef([]);
    const notificationSubscriptionRef = useRef(null);

    // Cập nhật conversationIds khi currentConversationId thay đổi
    useEffect(() => {
        if (currentConversationId) setConversationIds([currentConversationId]);
        else setConversationIds([]);
    }, [currentConversationId]);

    // ======================================================
    // 1. INIT WEBSOCKET — chỉ chạy một lần
    // ======================================================
    useEffect(() => {
        if (typeof window === "undefined") return;

        if (stompClientRef.current && stompClientRef.current.active) {
            console.log("Socket already exists → skip creating new one");
            return;
        }

        console.log("Creating new WebSocket connection...");

        const socket = new SockJS(
            `${process.env.NEXT_PUBLIC_API_BACKEND_WS}/ws`,
            null,
            { withCredentials: true }
        );

        const client = new Client({
            webSocketFactory: () => socket,
            connectHeaders: {},
            debug: () => { },
            reconnectDelay: 5000, // tự động reconnect nếu mất kết nối
        });

        client.onConnect = () => {
            console.log("WebSocket connected!");

            // SYSTEM QUEUES: receipts và errors
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

            systemSubscriptionRefs.current.push(subReceipt, subError);
        };

        client.activate();
        stompClientRef.current = client;

        return () => {
            console.log("Component unmounted → socket kept alive");
        };
    }, [token]);

    // ======================================================
    // 2. SUBSCRIBE CONVERSATION TOPIC
    // ======================================================
    useEffect(() => {
        console.log("Start to connect conversation");
        const client = stompClientRef.current;
        if (!client) return;

        const trySubscribeConversation = () => {
            if (!client.connected) {
                setTimeout(trySubscribeConversation, 100); // retry nếu chưa connect
                return;
            }

            // Unsubscribe cũ
            conversationSubscriptionRefs.current.forEach((sub) => sub?.unsubscribe());
            conversationSubscriptionRefs.current = [];

            // Subscribe mới
            conversationIds.forEach((id) => {
                const sub = client.subscribe(`/topic/conversation/${id}`, (msg) => {
                    const body = JSON.parse(msg.body);
                    switch (body.eventType) {
                        case "NEW_MESSAGE":
                            dispatch(
                                receiveNewMessage({
                                    ...body.data,
                                    currentUserId: account?.userId,
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
                            dispatch(markConversationAsRead({ conversationId: id }));
                            break;
                        default:
                            console.warn("Unknown WS event:", body);
                    }
                });

                conversationSubscriptionRefs.current.push(sub);
            });

            console.log("Connect to conversation successfully!")
        };

        trySubscribeConversation();
    }, [conversationIds, account?.userId]);

    // ======================================================
    // 3. SUBSCRIBE NOTIFICATIONS
    // ======================================================
    useEffect(() => {
        console.log("Start to connect notification");
        const client = stompClientRef.current;
        if (!client || !account?.userId) return;

        const trySubscribeNotifications = () => {
            if (!client.connected) {
                setTimeout(trySubscribeNotifications, 100); // retry nếu chưa connect
                return;
            }

            if (notificationSubscriptionRef.current) {
                notificationSubscriptionRef.current.unsubscribe();
                notificationSubscriptionRef.current = null;
            }

            const sub = client.subscribe(
                `/topic/notifications/${account.userId}`,
                (msg) => {
                    const body = JSON.parse(msg.body);
                    console.log("Received notification:", body);
                    dispatch(addNewNotification(body));
                }
            );

            notificationSubscriptionRef.current = sub;
            console.log("Subscribed to notifications for user:", account.userId);
        };

        trySubscribeNotifications();
    }, [account?.userId]);

    // ======================================================
    // SEND / DELETE / MARK AS READ
    // ======================================================
    const sendMessage = (payload) => {
        if (!stompClientRef.current) return;

        const tempId = crypto.randomUUID();
        const finalPayload = { ...payload, tempId };
        dispatch(addTempMessage({ ...finalPayload, status: "sending" }));

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
