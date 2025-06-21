import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import Serene from './pages/Serene';
import Breathe from './pages/features/Breathe';
import Coach from './pages/features/Coach';
import Reset from './pages/features/Reset';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/serene" element={<Serene />} />
              <Route path="/serene/breathe" element={<Breathe />} />
              <Route path="/serene/coach" element={<Coach />} />
              <Route path="/serene/reset" element={<Reset />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;