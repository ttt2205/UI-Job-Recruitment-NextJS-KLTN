import { SocialNetworkIconData } from "@/data/social-network.data";

const Social = ({ socialMedias }) => {
  if (!socialMedias) return <p>Not found company's social network</p>;
  return (
    <div className="social-links">
      {socialMedias.map((item) => (
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <i className={`fab ${SocialNetworkIconData[item.platform]}`}></i>
        </a>
      ))}
    </div>
  );
};

export default Social;
