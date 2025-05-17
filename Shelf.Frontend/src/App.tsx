import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home  from './pages/Home';
import Navbar from './components/Navbar';
import LoginRegister from './pages/LoginRegister';
import { isAuthenticated } from './utilities/utils';
import { useState } from 'react';
import Profile from './pages/Profile';

function App() {
  const [auth, setAuth] = useState(isAuthenticated());
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Navbar isAuthenticated={auth}/>
        <div className="flex-grow-1 d-flex">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login-register" element={<LoginRegister setAuth={setAuth}/>} />
            <Route path="/profile" element={<Profile  setAuth={setAuth}/>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App
