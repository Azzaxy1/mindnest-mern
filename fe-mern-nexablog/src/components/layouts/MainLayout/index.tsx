import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header } from "../../molecules";
import "./main-layout.scss";
import { useEffect, useState } from "react";
import { fetchUserLogged } from "../../../services/authService";
// import IUser from "../../../types/userType";

// interface MainLayoutProps {
//   user: IUser | null;
// }

const MainLayout = () => {
  const [user, setUser] = useState(null);
  console.log("user", user);

  useEffect(() => {
    fetchUserLogged().then((res) => {
      setUser(res?.data);
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="main-app-wrapper">
      <Header user={user} onLogout={handleLogout} />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
