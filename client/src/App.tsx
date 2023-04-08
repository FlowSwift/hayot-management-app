import './App.css';
import DashboardPage from './dashboard/DashboardPage';
import LoginPage from './login/LoginPage';
import GlobalNavbar from './navbar/Navbar';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GlobalStyles from './styles/GlobalStyles';
import SignUpPage from './login/SignUpPage';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <GlobalStyles />
        <header className="App-header">
          <GlobalNavbar />
        </header>
        <main>
          <Routes>
            <Route path="/dashboard" element={<DashboardPage manageType="products" />}></Route>
            <Route path="/categories" element={<DashboardPage manageType="categories" />}></Route>
            <Route path="/brands" element={<DashboardPage manageType="brands" />}></Route>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
            <Route path="/login" element={<LoginPage />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
