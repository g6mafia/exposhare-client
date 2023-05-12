import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import HomePage from "./pages/HomePage/HomePage";
import "./App.scss";
import ShopPage from "./pages/ShopPage/ShopPage";
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import { useState, useEffect} from "react";

function App() {
  const [change, setChange] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("token"));
  const [profileData, setProfileData] = useState(null);

//handlechange function for changes in the user's authentication status or profileData
  function handleChange(newProfileData) {
    setProfileData(newProfileData);
    setIsAuthenticated(!!newProfileData);
    setChange((prevChange) => prevChange + 1);
  }
  return (
    <div className="app">
      <BrowserRouter>
        <Header profileData={profileData} isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/users/my-profile" element={<ProfilePage handleChange={handleChange}/>}/>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/signup" element={<SignUpPage setIsAuthenticated={setIsAuthenticated} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
