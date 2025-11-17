"use client";

import Image from "next/image";
import ChatHamburger from "./ChatHamburger";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import NotConversation from "./NotConversation";
import {
  fetchMessages,
  receiveNewMessage,
} from "@/features/messages/chatSlice";

const ChatBoxContentField = ({
  conversationId,
  sendMessage,
  deleteMessage,
}) => {
  const dispatch = useDispatch();
  const { messages, conversations } = useSelector((state) => state.chat);
  const [text, setText] = useState("");

  const conversation = conversations.find((c) => c.id === conversationId);
  const msgList = messages[conversationId] || [];
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (conversationId) dispatch(fetchMessages(conversationId));
  }, [conversationId]);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgList]);

  // Gửi message
  const handleSend = (e) => {
    e.preventDefault();
    if (!text.trim() || !conversationId) return;

    const payload = { conversationId, content: text.trim() };
    sendMessage(payload); // Gửi qua WebSocket
    setText("");
  };

  if (!conversationId) return <NotConversation />;

  return (
    <div className="card message-card">
      <div className="card-header msg_head">
        <div className="d-flex bd-highlight">
          <div className="img_cont">
            <Image
              width={48}
              height={48}
              src={
                conversation.displayImageUrl
                  ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_CANDIDATE}/${conversation.displayImageUrl}`
                  : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_AVATAR_FOR_CANDIDATE}`
              }
              className="rounded-circle user_img"
              alt=""
            />
          </div>
          <div className="user_info">
            <span>{conversation.displayName}</span>
          </div>
        </div>

        <div className="btn-box">
          <button className="dlt-chat">Delete Conversation</button>
          <ChatHamburger />
        </div>
      </div>
      {/* End .cart-header */}

      <div className="card-body msg_card_body">
        {msgList.map((m) => {
          const isMine = m.senderUserId !== conversation.otherUserId;

          return (
            <div
              key={m?.id || m?.tempId}
              className={`message-row ${isMine ? "mine" : "theirs"}`}
            >
              {/* ICON XÓA CHỈ HIỂN THỊ KHI HOVER */}
              {m.status !== "sending" && m.status !== "error" && (
                <button
                  className="delete-icon"
                  onClick={() =>
                    deleteMessage({ conversationId, messageId: m.id })
                  }
                >
                  🗑
                </button>
              )}

              <div className="msg-wrapper">
                <div className="msg-bubble">{m.content}</div>
                <div className="msg-time">{m.createdAt?.substring(11, 16)}</div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="card-footer">
        <form>
          <textarea
            className="form-control type_msg"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            type="button"
            className="theme-btn btn-style-one submit-btn"
            onClick={handleSend}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatBoxContentField;
