// src/components/Profile.jsx
import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';
import { primaryTextColor, secondaryTextColor, secondaryBgColor } from '../Constants/theme';
import { fadeIn } from '../Constants/animation';

const Profile = () => {
  const profileRef = React.useRef(null);
  const { scrollYProgress } = useScroll({ target: profileRef, offset: ["start end", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Parallax effect

  return (
    <motion.section
      id="profile"
      ref={profileRef}
      className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center overflow-hidden z-10 rounded-xl my-8 shadow-2xl"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={fadeIn}
      style={{ backgroundColor: secondaryBgColor }}
    >
      {/* Animated Gradient Background */}
      <motion.div
        className="absolute inset-0 z-0 opacity-40 rounded-xl"
        style={{
          background: 'linear-gradient(45deg, rgba(103,232,249,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(139,92,246,0.3) 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-animation 15s ease infinite',
          y: yBg // Parallax effect
        }}
      ></motion.div>
      {/* Subtle pattern over gradient */}
      <div className="absolute inset-0 pattern-dots-md opacity-10 z-0" style={{ color: secondaryTextColor }}></div>

      <div className="relative flex flex-col items-center gap-6 z-10">
        <motion.img
          src="https://i.imgur.com/EOwF6pK.jpeg"
          alt="Profile of Marl"
          className="w-48 h-64 sm:w-64 sm:h-80 object-cover mb-8 rounded-xl shadow-2xl border-4 border-cyan-500 transform hover:scale-105 transition-transform duration-500 ease-in-out"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        />
        <motion.p
          className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4"
          style={{ color: primaryTextColor }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Marl Joshua</span>
        </motion.p>
        <motion.p
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-8"
          style={{ color: secondaryTextColor }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          A passionate Computer Science Graduate, UI/UX Designer, and Web Developer dedicated to building modern, responsive, and user-centric applications. My expertise spans across React, JavaScript, and various other cutting-edge web technologies.
        </motion.p>
        <motion.div
          className="flex flex-wrap justify-center gap-5 mt-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
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
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Profile;