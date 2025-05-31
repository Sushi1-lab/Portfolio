// src/components/SectionHeading.jsx
import React from 'react';
import { primaryTextColor } from '../Constants/theme';

const SectionHeading = ({ children }) => (
  <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 pb-3 relative inline-block group"
      style={{ color: primaryTextColor }}>
    {children}
    <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-500"></span>
  </h2>
);

export default SectionHeading;