const Social = ({ socialMedias }) => {
  const platformIcons = {
    Facebook: "fa-facebook-f",
    Twitter: "fa-twitter",
    Instagram: "fa-instagram",
    LinkedIn: "fa-linkedin-in",
  };

  return (
    <div className="social-links">
      {socialMedias.map((item, index) => {
        const iconClass = platformIcons[item.platform];
        if (!iconClass) return null; // bỏ qua platform không xác định
        return (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
          >
            <i className={`fab ${iconClass}`}></i>
          </a>
        );
      })}
    </div>
  );
};

export default Social;
