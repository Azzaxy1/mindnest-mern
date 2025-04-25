import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Logo } from "../../../assets";
import { Link } from "react-router-dom";

type IconProps = {
  children: React.ReactNode;
};

const Icon = ({ children }: IconProps) => {
  return (
    <div className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full border border-gray-700 transition-all duration-300 hover:-translate-y-1">
      {children}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Logo and Creator */}
          <div className="flex items-center space-x-3 mb-4 md:mb-0">
            <img
              className="h-10 w-10 bg-white rounded-full border border-gray-700"
              src={Logo}
              alt="logo-app"
            />
            <p className="text-gray-400">
              Created by{" "}
              <span className="text-white font-medium">Abdurrohman Azis</span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex space-x-4">
            <Icon>
              <Link target="_blank" to="https://github.com/Azzaxy1">
                <FaGithub className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Link>
            </Icon>
            <Icon>
              <Link
                target="_blank"
                to="https://www.linkedin.com/in/Abdurrohmanazis/"
              >
                <FaLinkedin className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Link>
            </Icon>
            <Icon>
              <Link target="_blank" to="https://instagram.com/ar.azis_">
                <FaInstagram className="h-5 w-5 text-gray-400 hover:text-white transition-colors" />
              </Link>
            </Icon>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            Mindnest © {new Date().getFullYear()} • All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
