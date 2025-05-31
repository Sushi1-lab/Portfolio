// src/components/WebDesigns.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/sectionheadings';
import { singleWebDesignImage, singleWebDesignImage1 } from '../Constants/data';
import { slideUp, container, fallIn } from '../Constants/animation';

const WebDesigns = () => {
  return (
    <motion.section
      id="web-designs"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={slideUp}
    >
      <SectionHeading>Web Designs</SectionHeading>
      <motion.div
        className="flex justify-center flex-row items-center p-4"
        variants={container}
      >
        <motion.div
          className="w-full max-w-4xl h-[400px] md:h-[500px] lg:h-[400px] xl:h-[500px] overflow-hidden flex items-center justify-center"
          variants={fallIn}
        >
          <img
            src={singleWebDesignImage}
            alt="My Web Design"
            className="w-full h-full object-contain shadow-2xl" // Use object-contain to fit the image without cropping
            loading="lazy"
          />
        </motion.div>

        <motion.div
          className="w-full max-w-4xl h-[400px] md:h-[500px] lg:h-[400px] xl:h-[500px] overflow-hidden flex items-center justify-center"
          variants={fallIn}
        >
          <img
            src={singleWebDesignImage1}
            alt="My Web Design"
            className="w-full h-full object-contain shadow-2xl" // Use object-contain to fit the image without cropping
            loading="lazy"
          />
        </motion.div>
        
      </motion.div>
    </motion.section>
  );
};

export default WebDesigns;