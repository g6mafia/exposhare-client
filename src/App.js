import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import HomePage from './pages/HomePage';
import './App.scss';
import AuthFailPage from './pages/AuthFailPage';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="auth-fail" element={<AuthFailPage />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
