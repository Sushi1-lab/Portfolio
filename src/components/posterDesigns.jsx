// src/components/PosterDesigns.jsx
import React from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/sectionheadings';
import ProjectCard from './projectCard';
import { posterDesignProjects } from '../Constants/data';
import { container } from '../Constants/animation';

const PosterDesigns = () => {
  return (
    <motion.section
      id="poster-designs"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
    >
      <SectionHeading>Poster Designs</SectionHeading>
      <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10" variants={container}>
        {posterDesignProjects.map((project) => (
          <ProjectCard key={project.id} {...project} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default PosterDesigns;