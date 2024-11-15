import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Error, Home, Login, Register } from "./pages";
import CreateBlog from "./pages/CreateBlog";
import DetailBlog from "./pages/DetailBlog";
import { MainLayout } from "./components";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index Component={Home} />
            <Route path="/create-blog/:id?" Component={CreateBlog} />
            <Route path="/detail-blog/:id" Component={DetailBlog} />
          </Route>
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="*" Component={Error} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
