import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";
import AuthFailPage from "./pages/AuthFailPage/AuthFailPage";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useState, useEffect } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {

 }, []);

  return (
    <div className="app">
      <BrowserRouter>
        <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/auth-fail" element={<AuthFailPage />} />
          <Route path="/my-profile" element={<ProfilePage />}/>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUpPage setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
