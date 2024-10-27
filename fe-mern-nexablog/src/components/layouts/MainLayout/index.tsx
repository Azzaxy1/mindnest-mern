import { Outlet } from "react-router-dom";
import { Header } from "../../molecules";

const MainLayout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <p>Footer</p>
    </div>
  );
};

export default MainLayout;
