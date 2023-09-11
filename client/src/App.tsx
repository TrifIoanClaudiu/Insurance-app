import { FC } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Main from "./pages/Main";
import UserPage from "./pages/UserPage";

const App: FC = () => {


  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Main />} />
        <Route path="/user" element={<UserPage />} />
        
      </Routes>
    </Router>
  );
};

export default App;
