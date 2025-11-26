import Image from "next/image";

const ChatboxContactList = ({
  conversations,
  currentConversationId,
  onSelect,
}) => {
  return (
    <ul className="contacts">
      {conversations.map((c) => (
        <li
          key={c.id}
          className={c.id === currentConversationId ? "active" : ""}
          onClick={() => onSelect(c.id)}
        >
          <a href="#">
            <div className="d-flex bd-highlight">
              <div className="img_cont">
                <Image
                  src={
                    c.displayImageUrl
                      ? `${process.env.NEXT_PUBLIC_API_BACKEND_URL_IMAGE_COMPANY}/${c.displayImageUrl}`
                      : `${process.env.NEXT_PUBLIC_IMAGE_DEFAULT_LOGO_FOR_EMPLOYER}`
                  }
                  width={50}
                  height={50}
                  className="rounded-circle user_img"
                  alt=""
                />
              </div>
              <div className="user_info">
                <span>{c.displayName}</span>
                <p>{c.lastMessageContent}</p>
              </div>
              {c.unreadCount > 0 && (
                <span className="count">{c.unreadCount}</span>
              )}
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default ChatboxContactList;
