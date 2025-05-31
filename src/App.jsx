// src/App.jsx
import React, { useState } from "react";
import './index.css'; // Your main CSS file

// Import components
import ParticleCanvas from './components/particleCanvas';
import Navbar from './components/NavBar';
import Profile from './components/Profile';
import Certifications from './components/Certifications';
import CodeProjects from './components/codeProjects';
import PosterDesigns from './components/posterDesigns';
import WebDesigns from './components/webdesigns';
import Tools from './components/Tools';
import Footer from './components/Footer';

// Import theme colors
import { primaryBgColor } from './Constants/theme';

export default function Portfolio() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavLinkClick = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen font-sans antialiased relative overflow-hidden" style={{ backgroundColor: primaryBgColor }}>
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Navigation */}
      <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        handleNavLinkClick={handleNavLinkClick}
      />

      <div className="h-20" />

      <Profile />
      <Certifications />
      <CodeProjects />
      <PosterDesigns />
      <WebDesigns />
      <Tools />
      <Footer />
    </div>
  );
}