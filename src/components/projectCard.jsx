// src/components/ProjectCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { secondaryBgColor, borderColor, primaryTextColor, secondaryTextColor, buttonBgColor } from '../Constants/theme';
import { item } from '../Constants/animation';

const ProjectCard = ({ title, image, description, liveUrl, TypeIcon }) => (
  <motion.div
    className="rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between transform hover:-translate-y-2 relative group cursor-pointer"
    style={{ backgroundColor: secondaryBgColor, border: `1px solid ${borderColor}` }}
    variants={item}
    whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)" }}
  >
    <img
      src={image}
      alt={title}
      className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
    />
    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-xl font-bold mb-2" style={{ color: primaryTextColor }}>{title}</h3>
      <p className="text-sm md:text-base leading-relaxed mb-4 flex-grow" style={{ color: secondaryTextColor }}>
        {description}
      </p>
      {liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-center font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 text-base shadow-md hover:shadow-lg mt-auto relative overflow-hidden"
          style={{ backgroundColor: buttonBgColor, color: primaryTextColor }}
        >
          <span className="relative z-10">{TypeIcon ? <TypeIcon className="inline-block mr-2" /> : null} View</span>
          {/* Shimmer effect on hover */}
          <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-lg"></span>
        </a>
      ) : (
        <button
          disabled
          className="inline-block text-center font-semibold py-2.5 px-6 rounded-lg cursor-not-allowed text-base mt-auto opacity-70"
          style={{ backgroundColor: borderColor, color: secondaryTextColor }}
        >
          No Live Demo
        </button>
      )}
    </div>
  </motion.div>
);

export default ProjectCard;