import { Link, NavLink } from "react-router-dom";
import "./header.scss";
import { MdLogout } from "react-icons/md";

const Header = () => {
  return (
    <header className="header">
      <nav className="nav">
        <Link className="logo-app" to="/">
          <h2>
            Nexa<span>Blog</span>
          </h2>
        </Link>
        <NavLink to="/login" className="menu-item">
          <MdLogout className="icon" />
          <p>Logout</p>
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
