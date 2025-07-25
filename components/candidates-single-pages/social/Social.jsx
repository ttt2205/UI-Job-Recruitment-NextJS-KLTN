import { SocialNetworkIconData } from "@/data/social-network.data";

const Social = ({ socialContents }) => {
  return (
    <div className="social-links">
      {socialContents.map((item, index) => (
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          key={index}
        >
          <i
            className={`fab ${
              SocialNetworkIconData[item.platform.toLowerCase()] || "fa-globe"
            }`}
          ></i>
        </a>
      ))}
    </div>
  );
};

export default Social;
