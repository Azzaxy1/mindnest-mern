import { Link } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import IUser from "../../../types/userType";

interface HeaderProps {
  user: IUser | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="bg-gray-900 border-b border-gray-800 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 group-hover:from-purple-500 group-hover:to-blue-600 transition-all duration-300">
              Nexa<span className="text-white">Blog</span>
            </h2>
          </Link>

          {/* User Info and Logout */}
          {user && (
            <div className="flex items-center space-x-4">
              <p className="text-gray-300 font-medium hidden sm:block">
                Welcome, <span className="text-white">{user.name}</span>
              </p>

              <button
                onClick={onLogout}
                className="flex items-center space-x-1 cursor-pointer bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg border border-gray-700 transition-all duration-200 group"
              >
                <MdLogout className="text-gray-400 group-hover:text-white" />
                <span className="text-gray-300 group-hover:text-white">
                  Logout
                </span>
              </button>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
