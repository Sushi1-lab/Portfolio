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
            className="relative group cursor-pointer z-0 hover:z-50"
          >
            {/* Card container */}
            <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:shadow-2xl bg-white">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[300px] object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating popup preview */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-125 transition duration-300 pointer-events-none z-50">
              <img
                src={project.image}
                alt={project.title}
                className="w-[350px] md:w-[450px] rounded-xl shadow-2xl border border-white"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PosterDesigns;