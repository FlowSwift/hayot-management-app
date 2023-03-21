import './App.css';
import ProductTable from './products/ProductTable';
import LoginPage from './login/LoginPage';
import Navbar from './navbar/Navbar';
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <p>
            Hayot Management
          </p>
          <Navbar />
        </header>
        <main>
          <Routes>
            <Route path="/dashboard" element={<ProductTable />}></Route>
            <Route path="/" element={<LoginPage />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
