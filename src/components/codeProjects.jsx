// src/components/CodeProjects.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import SectionHeading from '../components/sectionheadings';
import { githubRepos, liveProjectUrls } from '../Constants/data';
import { extractOwnerAndRepo } from '../utils/githubutils';
import { secondaryBgColor, borderColor, primaryTextColor, secondaryTextColor, buttonBgColor, highlightColor, primaryBgColor, accentColor } from'../Constants/theme'; 
import { slideUp, container, item } from '../Constants/animation';

const CodeProjects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchRepos() {
      const data = await Promise.all(
        githubRepos.map(async (url) => {
          const info = extractOwnerAndRepo(url);
          if (!info) return null;

          const apiUrl = `https://api.github.com/repos/${info.owner}/${info.repo}`;
          try {
            const res = await fetch(apiUrl);
            if (!res.ok) return null;
            const json = await res.json();
            const key = `${info.owner}/${info.repo}`;

            return {
              id: json.id,
              name: json.name,
              description: json.description,
              url: json.html_url,
              stars: json.stargazers_count,
              language: json.language,
              owner: json.owner.login,
              avatar: json.owner.avatar_url,
              liveUrl: liveProjectUrls[key] || null,
            };
          } catch {
            return null;
          }
        })
      );
      setProjects(data.filter(Boolean));
    }
    fetchRepos();
  }, []);

  return (
    <motion.section
      id="projects"
      className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={slideUp}
    >
      <SectionHeading>Code Projects</SectionHeading>

      {projects.length === 0 ? (
        <p className="text-lg" style={{ color: secondaryTextColor }}>Loading projects from GitHub...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
          variants={container}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between transform hover:-translate-y-1 group relative"
              style={{ backgroundColor: secondaryBgColor, border: `1px solid ${borderColor}` }}
              variants={item}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)" }}
            >
              {/* Subtle radial gradient background on hover */}
              <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mb-4 gap-4 group relative z-10"
              >
                <img
                  src={project.avatar}
                  alt={project.owner}
                  className="w-12 h-12 rounded-full border-2 transform group-hover:scale-110 transition-transform duration-300" style={{ borderColor: highlightColor }}
                />
                <h3 className="text-xl font-bold" style={{ color: primaryTextColor }}>{project.name}</h3>
              </a>
              <p className="mb-4 min-h-[4rem] text-sm md:text-base leading-relaxed relative z-10" style={{ color: secondaryTextColor }}>
                {project.description || "No description provided."}
              </p>
              <div className="flex justify-between items-center text-sm mb-6 relative z-10" style={{ color: secondaryTextColor }}>
                <span className="flex items-center gap-1" style={{ color: highlightColor }}>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                  {project.stars}
                </span>
                <span className="font-medium px-3 py-1 rounded-full text-xs" style={{ backgroundColor: primaryBgColor, color: accentColor }}>{project.language || "N/A"}</span>
              </div>
              {project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-center font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 text-base shadow-md hover:shadow-lg mt-auto relative overflow-hidden"
                  style={{ backgroundColor: buttonBgColor, color: primaryTextColor }}
                >
                  <span className="relative z-10">Try Live Demo</span>
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
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default CodeProjects;