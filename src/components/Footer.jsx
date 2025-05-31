// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { primaryBgColor, primaryTextColor, secondaryTextColor } from '../Constants/theme';
import { fadeIn } from '../Constants/animation';

const Footer = () => {
  return (
    <motion.footer
      className="relative z-10 py-12 text-center"
      style={{ backgroundColor: primaryBgColor, borderTop: '1px solid #334155' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={fadeIn}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center mb-8">
          <p className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">
            Marl Joshua
          </p>
          <p className="mb-6 max-w-2xl" style={{ color: secondaryTextColor }}>
            Thank you for visiting my portfolio. I'm always eager to connect and discuss new opportunities or collaborations. Feel free to reach out!
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-4">
            <a
              href="https://www.facebook.com/bakus.abnuy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 rounded-full bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-blue-800 social-icon-hover"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/who0is_marl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full bg-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-pink-800 social-icon-hover"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/marl-joshua-banaguas-86a34826b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-blue-900 social-icon-hover"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Sushi1-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-gray-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-gray-800 social-icon-hover"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
        <p className="text-sm" style={{ color: secondaryTextColor }}>
          © {new Date().getFullYear()} Marl Joshua. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;