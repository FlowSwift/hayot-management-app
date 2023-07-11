import './App.css';
import DashboardPage from './dashboard/DashboardPage';
import LoginPage from './login/LoginPage';
import GlobalNavbar from './navbar/Navbar';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import SignUpPage from './login/SignUpPage';
import AuthRoute from "./auth/AuthRoute";
import checkIfUserIsAuthenticated from "./auth/util";


const App: React.FC = () => {
  const isAuthenticated = checkIfUserIsAuthenticated();
  console.log(isAuthenticated)

  return (
    <Router>
      <div className="App">
        <GlobalStyles />
        <header className="App-header">
          <GlobalNavbar />
        </header>
        <main>
          <Routes>
            <Route
              path="/dashboard"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <DashboardPage manageType="products" />
                </AuthRoute>
              }
            />
            <Route
              path="/brands"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <DashboardPage manageType="brands" />
                </AuthRoute>
              }
            />
            <Route
              path="/categories"
              element={
                <AuthRoute isAuthenticated={isAuthenticated}>
                  <DashboardPage manageType="categories" />
                </AuthRoute>
              }
            />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<DashboardPage manageType="products" />} />
            {/* Other routes */}
          </Routes>
        </main>
      </div>
    </Router >
  );
};

export default App;