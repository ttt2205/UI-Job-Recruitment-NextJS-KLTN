"use client";

import SearchBox from "./SearchBox";
import ContactList from "./ContactList";
import ContentField from "./ContentField";
import { useDispatch, useSelector } from "react-redux";
import { chatSidebarToggle } from "../../../../../features/toggle/toggleSlice";
import {
  fetchConversations,
  markConversationAsRead,
  setCurrentConversation,
} from "@/features/messages/chatSlice";
import { useEffect } from "react";
import { useWebSocket } from "@/hooks/useSocket";

const ChatBox = () => {
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.auth);
  const { currentConversationId, conversations } = useSelector(
    (state) => state.chat
  );

  // WebSocket
  const { sendMessage, markAsRead, deleteMessage } = useWebSocket(
    accessToken,
    currentConversationId ? [currentConversationId] : []
  );

  // Load conversations
  useEffect(() => {
    dispatch(fetchConversations());
  }, []);

  // ============================== Handle Functions ===============================
  const onSelectConversation = (id) => {
    dispatch(setCurrentConversation(id));
    dispatch(markConversationAsRead(id));
    markAsRead({ conversationId: id });
  };

  const chatToggle = () => {
    dispatch(chatSidebarToggle());
  };

  // =============================== Render UI ===============================
  return (
    <div className="row">
      <div
        className="contacts_column col-xl-4 col-lg-5 col-md-12 col-sm-12 chat"
        id="chat_contacts"
      >
        <div className="card contacts_card">
          <div className="card-header">
            {/* Startclose chatbox in mobile menu */}
            <div
              className="fix-icon position-absolute top-0 end-0 show-1023"
              onClick={chatToggle}
            >
              <span className="flaticon-close"></span>
            </div>
            {/* close chatbox in mobile menu */}
            <div className="search-box-one">
              <SearchBox />
            </div>
          </div>
          {/* End cart-heaer */}

          <div className="card-body contacts_body">
            <ContactList
              conversations={conversations}
              currentConversationId={currentConversationId}
              onSelect={(id) => onSelectConversation(id)}
            />
          </div>
        </div>
      </div>
      {/* End chat_contact */}

      <div className=" col-xl-8 col-lg-7 col-md-12 col-sm-12 chat">
        <ContentField
          conversationId={currentConversationId}
          sendMessage={sendMessage}
          deleteMessage={deleteMessage}
        />
      </div>
      {/* chatbox-field-content */}
    </div>
  );
};

export default ChatBox;
