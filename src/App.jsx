  import { useEffect, useState } from "react";
  import { motion } from "framer-motion";
  import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegram, FaLinkedin, FaGithub } from 'react-icons/fa';

  const githubRepos = [
    "https://github.com/Sushi1-lab/Invitation",
    "https://github.com/Sushi1-lab/Finance-Tracker",
    "https://github.com/Sushi1-lab/Elan",
  ];

  const liveProjectUrls = {
    "Sushi1-lab/Invitation": "https://invitation-ten-xi.vercel.app/",
    "Sushi1-lab/Finance-Tracker": "https://finance-tracker-seven-beta.vercel.app/",
    "Sushi1-lab/Elan": "https://elan-swart.vercel.app/",
  };

  const designProjects = [
    {
      id: 1,
      title: "Watch E-commerce Website Design",
      image: "https://i.imgur.com/AJXVrY5.png",
      description: "Showcasing a modern watch e-commerce application with a sleek design.",
      liveUrl: "https://imgur.com/a/yTXZSGm",
    },
    {
      id: 2,
      title: "Cars Color consultation Website Design",
      image: "https://i.imgur.com/rcaWiv6.png",
      description: "Cars Color consultation Website Design with a clean and modern look.",
      liveUrl:"https://imgur.com/a/baNY2GL",
    }]

  const designProjects1 = [
    {
      id: 1,
      title: "Basketball Poster",
      image: "https://i.imgur.com/k7aMr1V.png",
      description: "Practice for using vibrant colors.",
      liveUrl: "https://i.imgur.com/k7aMr1V.png",
    },
    {
      id: 2,
      title: "Basketball Poster",
      image: "https://i.imgur.com/FAZ8nRa.png",
      description: "Practice for using vibrant colors.",
      liveUrl:"https://i.imgur.com/FAZ8nRa.png",
    },
    {
      id: 3,
      title: "Basketball Poster",
      image: "https://i.imgur.com/QhTCq35.jpeg",
      description: "Practice for using vibrant colors.",
      liveUrl: "https://i.imgur.com/QhTCq35.jpeg",
    },
    {
      id: 4,
      title: "New Product Realising Poster",
      image: "https://i.imgur.com/lPU3wyV.png",
      description: "Empasizing the new product with a clean design.",
      liveUrl: "https://i.imgur.com/lPU3wyV.png",
    },
    {
      id: 5,
      title: "Showcasing Hardware Components Poster",
      image: "https://i.imgur.com/yN6NT29.jpeg",
      description: "Showcasing hardware components with a modern design.",
      liveUrl: "https://i.imgur.com/yN6NT29.jpeg",
    },
    {
      id: 6,
      title: "Magazine Cover Design",
      image: "https://i.imgur.com/wCRoD29.jpeg",
      description: "Thesis Magazine Cover Design",
      liveUrl: "https://i.imgur.com/wCRoD29.jpeg",
    },
    {
      id: 7,
      title: "Menu Poster",
      image: "https://i.imgur.com/7OtMXC4.jpeg",
      description: "Showing the menu of a client with a clean design.",
      liveUrl: "https://i.imgur.com/7OtMXC4.jpeg",
    },
    {
      id: 8,
      title: "Invitation Poster",
      image: "https://i.imgur.com/zwBTaow.jpeg",
      description: "Showcasing an invitation poster with a modern design.",
      liveUrl: "https://i.imgur.com/zwBTaow.jpeg",
    }

  ];


  function extractOwnerAndRepo(url) {
    try {
      const parts = new URL(url).pathname.split("/").filter(Boolean);
      if (parts.length >= 2) {
        return { owner: parts[0], repo: parts[1] };
      }
    } catch {
      return null;
    }
    return null;
  }

  const slideUp = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  export default function Portfolio() {
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
      
      <div className="min-h-screen font-sans">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 bg-white/70 backdrop-blur-md shadow-md z-50">
          <div className="max-w-5xl mx-auto px-6 py-4 flex justify-center space-x-8">
            {["profile", "certifications", "projects", "designs", "tools"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className="relative uppercase font-semibold tracking-wider text-gray-700 hover:text-blue-600 transition-colors duration-300 px-3 py-2 group"
              >
                <span className="relative z-10">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                <span className="absolute left-0 bottom-0 h-0.5 bg-blue-600 transition-all duration-300 ease-in-out w-0 group-hover:w-full"></span>
              </a>
            ))}
          </div>
        </nav>
        <div className="h-16" />

        {/* Profile Section (first section - no negative margin) */}
       <motion.section
        id="profile"
        className="max-w-4xl mx-auto px-6 py-20 text-center relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={slideUp}
      >
        <div className="flex flex-col items-center gap-6">
          <img
            src="https://m.media-amazon.com/images/M/MV5BOTZhNDgwYmItMTdlZi00NDJlLWJlZWEtYmFlODE5MTBkYmIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
            alt="Profile of Marl"
            className="w-50 h-80 object-cover mb-6 shadow-2xl rounded-lg"
          />
          <p className="text-5xl font-bold text-white mb-6">I am Marl Joshua</p>
          <p className="text-lg text-blue-100 max-w-xl">
            A Computer Science Graduate passionate, a web developer building modern, responsive applications with expertise in React, JavaScript, and more.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            <a
              href="https://www.facebook.com/bakus.abnuy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110"
            >
              <FaFacebook className="w-7 h-7" />
            </a>
            <a
              href="https://www.instagram.com/who0is_marl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-pink-500 hover:text-pink-700 transition-transform hover:scale-110"
            >
              <FaInstagram className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/marl-joshua-banaguas-86a34826b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-blue-700 hover:text-blue-900 transition-transform hover:scale-110"
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a
              href="https://github.com/Sushi1-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-blue-700 hover:text-blue-900 transition-transform hover:scale-110"
            >
              <FaGithub className="w-7 h-7" />
            </a>
          </div>
        </div>
      </motion.section>

        {/* Certifications Section with overlap */}
      <motion.section
      id="certifications"
      className="max-w-6xl mx-auto px-6 py-20 text-center relative -mt-20 z-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      variants={slideUp}
    >
      <h2 className="text-4xl font-semibold mb-12">Certifications</h2>
      
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <li className="border-l-4 border-blue-600 pl-4 p-4 bg-white rounded-lg shadow-md">
          <div className="border border-gray-300 rounded-lg p-2 mb-4">
            <img
              src="https://i.imgur.com/XEo2GOl.jpeg"
              alt="Frontend Web Developer Certificate"
              className="w-full max-w-xs h-auto mx-auto rounded"
              loading="lazy"
            />
          </div>
          <p className="font-semibold text-center text-base">Most Innovative Project & Study | Reserarch Symposium</p>
          <p className="text-gray-600 text-center text-sm mb-2">Received 2024</p>
          <div className="text-center">
            <a
              href="https://i.imgur.com/XEo2GOl.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Full Image
            </a>
          </div>
        </li>

        <li className="border-l-4 border-blue-600 pl-4 p-4 bg-white rounded-lg shadow-md">
          <div className="border border-gray-300 rounded-lg p-2 mb-4">
            <img
              src="https://i.imgur.com/sNSpNOI.jpeg"
              alt="React Developer Nanodegree"
              className="w-full max-w-xs h-auto mx-auto rounded"
              loading="lazy"
            />
          </div>
          <p className="font-semibold text-center text-base">Penetration Testing With Ethical Hacking Training - NexusCloud IT Solutions</p>
          <p className="text-gray-600 text-center text-sm mb-2">Completed 2025</p>
          <div className="text-center">
            <a
              href="https://i.imgur.com/sNSpNOI.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Full Image
            </a>
          </div>
        </li>

        <li className="border-l-4 border-blue-600 pl-4 p-4 bg-white rounded-lg shadow-md">
          <div className="border border-gray-300 rounded-lg p-2 mb-4">
            <img
              src="https://i.imgur.com/3ReV0Wd.jpeg"
              alt="AWS Certified Solutions Architect"
              className="w-full max-w-xs h-auto mx-auto rounded"
              loading="lazy"
            />
          </div>
          <p className="font-semibold text-center text-base">Cisco Certified Netowort Associate Training | NexusClout IT Solutions</p>
          <p className="text-gray-600 text-center text-sm mb-2">Completed 2025</p>
          <div className="text-center">
            <a
              href="https://i.imgur.com/3ReV0Wd.jpeg"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 px-4 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Full Image
            </a>
          </div>
        </li>

      </ul>
    </motion.section>

        {/* Projects Section with overlap */}
        <motion.section
          id="projects"
          className="max-w-6xl mx-auto px-6 py-20 text-center relative -mt-20 z-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideUp}
        >
          <h2 className="text-4xl font-semibold mb-10">Projects</h2>

          {projects.length === 0 ? (
            <p>Loading projects...</p>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={container}
              initial="hidden"
              animate="visible"
              viewport={{ once: true, amount: 0.25 }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-left flex flex-col justify-between"
                  variants={item}
                >
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center mb-4 gap-4"
                  >
                    <img
                      src={project.avatar}
                      alt={project.owner}
                      className="w-10 h-10 rounded-full"
                    />
                    <h3 className="text-xl font-semibold">{project.name}</h3>
                  </a>
                  <p className="mb-4 text-gray-600 min-h-[3rem]">
                    {project.description || "No description provided."}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>⭐ {project.stars}</span>
                    <span>{project.language || "N/A"}</span>
                  </div>
                  {project.liveUrl ? (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                      Try Project
                    </a>
                  ) : (
                    <button
                      disabled
                      className="inline-block text-center bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
                    >
                      No Live Demo
                    </button>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </motion.section>

        {/* Designs Section with overlap */}
        <motion.section
          id="designs"
          className="max-w-6xl mx-auto px-6 py-20 text-center relative -mt-20 z-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideUp}
        >
          <h2 className="text-4xl font-semibold mb-10">Poster Designs</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {designProjects1.map(({ id, title, image, description, liveUrl }) => (
              <motion.div
                key={id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-left"
                variants={item}
              >
                <img
                  src={image}
                  alt={title}
                  className="rounded-md mb-4 object-cover w-full h-48"
                />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    View Design
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-block text-center bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
                  >
                    No Live Demo
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

         <motion.section
          id="designs"
          className="max-w-6xl mx-auto px-6 py-20 text-center relative -mt-20 z-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={slideUp}
        >
          <h2 className="text-4xl font-semibold mb-10">Web Designs</h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={container}
            initial="hidden"
            animate="visible"
            viewport={{ once: true, amount: 0.25 }}
          >
            {designProjects.map(({ id, title, image, description, liveUrl }) => (
              <motion.div
                key={id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition text-left"
                variants={item}
              >
                <img
                  src={image}
                  alt={title}
                  className="rounded-md mb-4 object-cover w-full h-48"
                />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600 mb-4">{description}</p>
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                  >
                    View Design
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-block text-center bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
                  >
                    No Live Demo
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Tools Section with overlap */}
       <motion.section
  id="tools"
  className="max-w-6xl mx-auto px-6 py-20 text-center relative -mt-20 z-0"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.25 }}
  variants={slideUp}
>
  <h2 className="text-4xl font-semibold mb-10">Tools I Use</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

    {/* WebDev Tools */}
    <div>
      <h3 className="text-2xl font-semibold mb-6">WebDev Tools</h3>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/fWRnBaX.png" alt="HTML" className="w-20 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">Javascript</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/p50Qdqz.png" alt="HTML" className="w-20  h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">HTML</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/R0MUf0G.png" alt="HTML" className="w-10 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">CSS</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/p84qlZF.png" alt="HTML" className="w-10 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">React</span>
        </div>
         <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/U52GWbJ.png" alt="HTML" className="w-10 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">Vite</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/hzIN8ss.png" alt="CSS" className="w-10 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">Tailwind</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/z1fScsK.png" alt="JavaScript" className="w-20 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">Github</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/PFhP5CL.png" alt="React" className="w-20 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">Firebase</span>
        </div>
        {/* Add more tools as needed */}
      </div>
    </div>

    {/* Design Tools */}
    <div>
      <h3 className="text-2xl font-semibold mb-6">Design Tools</h3>
      <div className="flex flex-wrap justify-center gap-6">
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/qKMRYbC.png" alt="HTML" className="w-20 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">Canva</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/D6UyNPW.png" alt="HTML" className="w-25 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">Figma</span>
        </div>
        <div className="flex flex-col items-center p-4 w-28">
          <img src="https://i.imgur.com/b5e3pj5.png" alt="HTML" className="w-25 h-10 object-contain mb-2" loading="lazy" />
          <span className="text-sm font-medium text-gray-700 text-center">JPhotoshop</span>
        </div>
        {/* Add more tools as needed */}
      </div>
    </div>

    


  </div>
</motion.section>

      </div>
    );
  }
