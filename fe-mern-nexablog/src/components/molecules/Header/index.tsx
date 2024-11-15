import { Link } from "react-router-dom";
import "./header.scss";
import { MdLogout } from "react-icons/md";
import IUser from "../../../types/userType";

interface HeaderProps {
  user: IUser | null;
  onLogout: () => void;
}

const Header = ({ user, onLogout }: HeaderProps) => {
  return (
    <header className="header">
      <nav className="nav">
        <Link className="logo-app" to="/">
          <h2>
            Nexa<span>Blog</span>
          </h2>
        </Link>
        <div className="nav-item">
          <p>{user?.name}</p>
          <div className="menu-item">
            <MdLogout className="icon" />
            <p onClick={onLogout}>Logout</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
