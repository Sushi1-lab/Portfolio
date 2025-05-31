// src/components/Certifications.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/sectionheadings';
import { certifications } from '../Constants/data';
import { secondaryBgColor, borderColor, primaryTextColor, secondaryTextColor, buttonBgColor, highlightColor, primaryBgColor, accentColor } from '../Constants/theme';
import { slideUp, container, item } from '../Constants/animation';

const Certifications = () => {
  return (
    <motion.section
      id="certifications"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={slideUp}
    >
      <SectionHeading>Certifications</SectionHeading>

      <motion.ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12"
        variants={container}
      >
        {certifications.map(cert => (
          <motion.li
            key={cert.id}
            className="flex flex-col rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden p-6 transform hover:-translate-y-1 group relative"
            style={{ backgroundColor: secondaryBgColor, border: `1px solid ${borderColor}` }}
            variants={item}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)" }}
          >
            {/* Subtle radial gradient background on hover */}
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            <div className="flex-shrink-0 mb-6 rounded-lg p-2 border-2 relative z-10" style={{ borderColor: highlightColor, backgroundColor: primaryBgColor }}>
              <img
                src={cert.image}
                alt={cert.title}
                className="w-full h-auto object-cover rounded-md shadow-inner"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow items-center text-center relative z-10">
              <p className="font-bold text-lg sm:text-xl mb-2" style={{ color: primaryTextColor }}>{cert.title}</p>
              <p className="text-sm mb-4" style={{ color: secondaryTextColor }}>
                {cert.received && `Received: `}<span className="font-semibold" style={{ color: primaryTextColor }}>{cert.received}</span>
                {cert.completed && `Completed: `}<span className="font-semibold" style={{ color: primaryTextColor }}>{cert.completed}</span>
                {cert.issuer && ` | `}<span style={{ color: accentColor }}>{cert.issuer}</span>
              </p>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block font-semibold py-2 px-6 rounded-lg transition-all duration-300 text-sm shadow-md hover:shadow-lg relative overflow-hidden"
                style={{ backgroundColor: buttonBgColor, color: primaryTextColor }}
              >
                <span className="relative z-10">View Certificate</span>
                <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer rounded-lg"></span>
              </a>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </motion.section>
  );
};

export default Certifications;