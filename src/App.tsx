import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { Register } from './pages/Register';
import { Experience } from './pages/Experience';
import { Awards } from './pages/Awards';
import Merch from './pages/Merch';
import Partners from './pages/Partners';

function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="min-h-screen bg-background text-on-surface font-body selection:bg-primary/30 selection:text-primary overflow-x-hidden max-w-full">
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/awards" element={<Awards />} />
        <Route path="/merch" element={<Merch />} />
        <Route path="/partners" element={<Partners />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
