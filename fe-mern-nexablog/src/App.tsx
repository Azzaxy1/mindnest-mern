import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Error, Home, Login, Register } from "./pages";

const App = () => {
  return (
    <div>
      <p>Header</p>
      <Router>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="*" Component={Error} />
        </Routes>
      </Router>
      <p>Footer</p>
    </div>
  );
};

export default App;
