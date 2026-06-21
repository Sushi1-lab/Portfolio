// src/components/PosterDesigns.jsx
import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/sectionheadings";
import { posterDesignProjects } from "../Constants/data";
import { container } from "../Constants/animation";

const PosterDesigns = () => {
  return (
    <motion.section
      id="poster-designs"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
    >
      <SectionHeading>Poster Designs</SectionHeading>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10"
        variants={container}
      >
        {posterDesignProjects.map((project) => (
          <motion.div
            key={project.id}
            className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-[300px] object-cover transition duration-300 group-hover:scale-110"
              loading="lazy"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition duration-300 flex items-center justify-center">
              <p className="text-white text-lg font-semibold opacity-0 group-hover:opacity-100 transition">
                {project.title}
              </p>
            </div>

            {/* Full Image Preview on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-contain bg-black"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PosterDesigns;