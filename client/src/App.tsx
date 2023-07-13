import './App.css';
import DashboardPage from './dashboard/DashboardPage';
import LoginPage from './login/LoginPage';
import GlobalNavbar from './navbar/Navbar';
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import SignUpPage from './login/SignUpPage';
import AuthRoute from "./auth/AuthRoute";
import checkIfUserIsAuthenticated from "./auth/util";


const App: React.FC = () => {
  const user = checkIfUserIsAuthenticated();
  let isAuthenticated = false
  if (user) {
    isAuthenticated = true;
  }


  return (
    <div className="App">
      <GlobalStyles />
      <header className="App-header">
        <GlobalNavbar />
      </header>
      <main>
        <Routes>
          <Route element={<AuthRoute isAuthenticated={isAuthenticated} />}>
            <Route path="dashboard/*" element={<DashboardPage />} />
          </Route>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage />} />
          {/* <Route path="*" element={<Navigate to="/dashboard" />} /> */}
          {/* Other routes */}
        </Routes>
      </main>
    </div>
  );
};

export default App;