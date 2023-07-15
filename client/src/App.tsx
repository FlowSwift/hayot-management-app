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
        setUser(userData);
        if (userData.isAuthenticated) {
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error(error);
      });
  }, []);


  const Header = () => {
    return (
      <>
      <GlobalStyles />
      <header className="App-header">
        <GlobalNavbar />
      </header>
      </>
    )
  }

  if (loading) {
    return (
      <>
      <Header />
      <p>loading....</p>
      </>
    )
  }

  return (
    <div className="App">
      <GlobalStyles />
      <header className="App-header">
        <GlobalNavbar />
      </header>
      <main>
        <Routes>
          <Route element={<AuthRoute user={user} />}>
            <Route path="dashboard/" element={<Navigate to="/dashboard/products" />} />
            <Route path="dashboard/*" element={<DashboardPage user={user} />} />
          </Route>
          <Route path="signup" element={<SignUpPage />} />
          <Route path="login" element={<LoginPage user={user} />} />
          <Route path="*" element={<Navigate to="/dashboard/products" />} />
          {/* Other routes */}
        </Routes>
        {!user.isAuthenticated &&
          <p>Loading....</p>}
      </main>
    </div>
  );
};

export default App;