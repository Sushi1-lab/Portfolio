// src/components/Tools.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/sectionheadings';
import { webDevTools, designTools } from '../Constants/data';
import { secondaryBgColor, borderColor, primaryTextColor, secondaryTextColor } from '../Constants/theme';
import { slideUp, container, item } from '../Constants/animation';

const ToolCard = ({ name, image }) => (
  <motion.div
    className="flex flex-col items-center p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative group"
    style={{ backgroundColor: secondaryBgColor, border: `1px solid ${borderColor}` }}
    variants={item}
    whileHover={{ scale: 1.05 }}
  >
    <img src={image} alt={name} className="w-16 h-16 sm:w-20 sm:h-20 object-contain mb-4 filter grayscale hover:grayscale-0 transition-all duration-300" />
    <h3 className="text-base sm:text-lg font-semibold" style={{ color: primaryTextColor }}>{name}</h3>
    <span className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-xl"></span>
  </motion.div>
);

const Tools = () => {
  return (
    <motion.section
      id="tools"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={slideUp}
    >
      <SectionHeading>Tools I Use</SectionHeading>

      <div className="mb-16">
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-cyan-400">Web Development Tools</h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={container}
        >
          {webDevTools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </motion.div>
      </div>

      <div>
        <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-sky-500">Design Tools</h3>
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          variants={container}
        >
          {designTools.map((tool, index) => (
            <ToolCard key={index} {...tool} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Tools;