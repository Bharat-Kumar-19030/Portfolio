import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHub from './components/GitHub';
import Contact from './components/Contact';
import Education from './components/Education';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import ManagePage from './pages/ManagePage';

function App() {
  const [adminPassword, setAdminPassword] = useState(
    () => sessionStorage.getItem('adminPwd') || ''
  );

  const handleLogin = (pwd) => {
    sessionStorage.setItem('adminPwd', pwd);
    setAdminPassword(pwd);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminPwd');
    setAdminPassword('');
  };

  const toastOptions = {
    duration: 4000,
    style: {
      background: '#1a1a3e',
      color: '#e2e8f0',
      border: '1px solid rgba(124, 58, 237, 0.3)',
      borderRadius: '12px',
    },
    success: { iconTheme: { primary: '#7c3aed', secondary: '#fff' } },
    error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={toastOptions} />
      <Routes>
        <Route
          path="/"
          element={
            <div className="relative noise-bg grid-bg">
              <Navbar />
              <Hero onLogin={handleLogin} />
              <About />
              <Skills />
              <Projects />
              <GitHub />
              <Education />
              <Contact />
              <Footer />
            </div>
          }
        />
        <Route
          path="/manage"
          element={
            adminPassword
              ? <ManagePage password={adminPassword} onLogout={handleLogout} />
              : <div className="min-h-screen noise-bg grid-bg flex items-center justify-center text-gray-500 text-sm">Access denied. Please login from the home page.</div>
          }
        />
        {/* Catch-all: static files like /resume.pdf are served by Vite; unknown routes redirect home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
