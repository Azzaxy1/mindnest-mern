import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Header } from "../../molecules";
import "./main-layout.scss";
import { useEffect, useState } from "react";
import { fetchUserLogged } from "../../../services/authService";
import Swal from "sweetalert2";

const MainLayout = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      navigate("/"); // Redirect ke home
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchUserLogged()
      .then((res) => {
        if (!res.data) {
          navigate("/login");
        } else {
          setUser(res?.data);
        }
      })
      .catch(() => {
        navigate("/login");
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");

    Swal.fire({
      icon: "success",
      title: "Logout Success",
      text: "Thank you for using NexaBlog",
    });
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
