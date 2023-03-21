import './App.css';
import ProductTable from './products/ProductTable';
import LoginPage from './login/LoginPage';
import Navbar from './navbar/Navbar';
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
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/dashboard" element={<ProductTable />}></Route>
            <Route path="/" element={<LoginPage />}></Route>
            <Route path="/signup" element={<SignUpPage />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
