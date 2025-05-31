// src/components/Navbar.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { primaryTextColor, primaryBgColor } from '../Constants/theme';
import { mobileMenuVariants } from '../Constants/animation';

const Navbar = ({ isMobileMenuOpen, setIsMobileMenuOpen, handleNavLinkClick }) => {
  const sections = ["profile", "certifications", "projects", "poster designs", "web designs", "tools"];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-950/80 backdrop-blur-md shadow-lg z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Logo/Name */}
        <a href="#profile" className="text-2xl font-bold transition-colors duration-300 relative group" style={{ color: primaryTextColor }}>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">Marl Joshua</span>
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {sections.map((section) => (
            <a
              key={section}
              href={`#${section.replace(/\s+/g, '-')}`}
              className="relative uppercase font-medium tracking-wide transition-colors duration-300 px-3 py-2 group text-base text-gray-300 hover:text-white"
            >
              <span className="relative z-10">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-in-out bg-gradient-to-r from-cyan-400 to-sky-500"></span>
            </a>
          ))}
        </div>

        {/* Mobile Burger Icon */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="focus:outline-none focus:ring-2 rounded-md p-2 transition-colors duration-200 text-gray-300 hover:text-white focus:ring-blue-500"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
             initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
            className="md:hidden fixed inset-0 z-[100] flex flex-col items-center justify-center space-y-4 pt-35 pb-8 px-4 backdrop-blur-md"
            style={{ backgroundColor: primaryBgColor + 'E0' }}
          >
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute top-6 right-6 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2"
              aria-label="Close navigation menu"
            >
              <FaTimes className="w-8 h-8" />
            </button>
            {sections.map((section) => (
              <a
                key={section}
                href={`#${section.replace(/\s+/g, '-')}`}
                onClick={handleNavLinkClick}
                className="text-lg sm:text-xl font-medium hover:text-gray-200 transition-colors duration-300 text-white drop-shadow-md"
                >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;