import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Error, Home, Login, Register } from "./pages";
import CreateJournal from "./pages/CreateJournal";
import DetailJournal from "./pages/DetailJournal";
import { MainLayout } from "./components";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index Component={Home} />
            <Route path="/create-journal/:id?" Component={CreateJournal} />
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
