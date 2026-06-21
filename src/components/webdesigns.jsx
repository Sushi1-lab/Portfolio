// src/components/WebDesigns.jsx
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/sectionheadings";
import {
  singleWebDesignImage,
  singleWebDesignImage1,
} from "../Constants/data";
import { slideUp, container, fallIn } from "../Constants/animation";

const WebDesigns = () => {
  const videoUrl =
      "https://drive.google.com/file/d/1XoX-VkAQvgfCYDhJlj1QLZGChhH0ngYo/preview?autoplay=1&mute=1";

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
        className="flex flex-col items-center gap-10 p-4"
        variants={container}
      >
        {/* First Image */}
        <motion.div
          className="w-full max-w-4xl h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center"
          variants={fallIn}
        >
          <img
            src={singleWebDesignImage}
            alt="Web Design 1"
            className="w-full h-full object-contain shadow-2xl rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {/* Second Image */}
        <motion.div
          className="w-full max-w-4xl h-[400px] md:h-[500px] overflow-hidden flex items-center justify-center"
          variants={fallIn}
        >
          <img
            src={singleWebDesignImage1}
            alt="Web Design 2"
            className="w-full h-full object-contain shadow-2xl rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {/* Video */}
        <motion.div className="w-full max-w-4xl" variants={fallIn}>
          <iframe
            src={videoUrl}
            title="Website Demo Video"
            className="w-full h-[400px] md:h-[500px] rounded-xl shadow-2xl"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WebDesigns;