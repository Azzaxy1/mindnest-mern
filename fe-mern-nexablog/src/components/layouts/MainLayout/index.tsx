import { Outlet } from "react-router-dom";
import { Footer, Header } from "../../molecules";
import "./main-layout.scss";

const MainLayout = () => {
  return (
    <div className="main-app-wrapper">
      <Header />
      <div className="content-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
