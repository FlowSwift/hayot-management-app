import './App.css';
import DashboardPage from './dashboard/DashboardPage';
import LoginPage from './login/LoginPage';
import GlobalNavbar from './navbar/Navbar';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import SignUpPage from './login/SignUpPage';
import AuthRoute from "./auth/AuthRoute";
import checkIfUserIsAuthenticated, { UserData } from "./auth/util";


const App: React.FC = () => {
  const [user, setUser] = useState<UserData>({ username: "", isAuthenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkIfUserIsAuthenticated()
      .then((userData) => {
        if (userData !== user) {
          setUser(userData);
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);

  const RoutesComp = () => {
    return (
      <Routes>
        <Route element={user.isAuthenticated && <AuthRoute user={user} />}>
          <Route path="dashboard/" element={<Navigate to="/dashboard/products" />} />
          <Route path="dashboard/*" element={<DashboardPage user={user} />} />
        </Route>
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage user={user} />} />
        <Route path="/" element={<Navigate to="/dashboard/products" />} />
        <Route path="*" element={<Navigate to="/login" />} />
        {/* Other routes */}
      </Routes>
    )
  }

  return (
    <div className="App">
      <GlobalStyles />
      <header className="App-header">
        <GlobalNavbar loading={loading} user={user}/>
      </header>
      <main>
        {
          (loading) ? (<p>Checking log in...</p>) : // wait for async function
            (
              !user.isAuthenticated ? (<LoginPage user={user} />) : // display login if not authenticated after loading
                <RoutesComp /> // open routes
            )
        }
      </main>
    </div>
  );
};

export default App;