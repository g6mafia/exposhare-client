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

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/auth-fail" element={<AuthFailPage />} />
          <Route path="profile" element={<ProfilePage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" render={(props) => <SignUpPage {...props} onSignUpSuccess={() => setIsAuthenticated(true)} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
