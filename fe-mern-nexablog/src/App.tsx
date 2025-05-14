import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import {
  DetailJournal,
  Error,
  Home,
  Login,
  Register,
  UpdatedJournal,
} from "./pages";
import { MainLayout } from "./components";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index Component={Home} />
            <Route path="/updated-journal/:id?" Component={UpdatedJournal} />
            <Route path="/detail-journal/:id" Component={DetailJournal} />
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
