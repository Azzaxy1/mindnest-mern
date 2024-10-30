import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Logo } from "../../../assets";
import "./footer.scss";
import { Link } from "react-router-dom";

type IconProps = {
  children: React.ReactNode;
};

const Icon = ({ children }: IconProps) => {
  return <div className="icon-wrapper">{children}</div>;
};

const Footer = () => {
  return (
    <footer>
      <div className="footer">
        <div className="logo-wrapper">
          <img className="logo" src={Logo} alt="logo-app" />
          <p>Abdurrohman Azis</p>
        </div>
        <div className="social-wrapper">
          <Icon>
            <Link target="_blank" to="https://github.com/Azzaxy1">
              <FaGithub className="icon" />
            </Link>
          </Icon>
          <Icon>
            <Link
              target="_blank"
              to="https://www.linkedin.com/in/Abdurrohmanazis/"
            >
              <FaLinkedin className="icon" />
            </Link>
          </Icon>
          <Icon>
            <Link target="_blank" to="https://instagram.com/ar.azis_">
              <FaInstagram className="icon" />
            </Link>
          </Icon>
        </div>
      </div>
      <div className="copyright">
        <p>
          NexaBlog © {new Date().getFullYear()}; created by Abdurrohman Azis
        </p>
      </div>
    </footer>
  );
};

export default Footer;
