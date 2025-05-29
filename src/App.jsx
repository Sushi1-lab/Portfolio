import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegram, FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';

// --- Configuration Data (Kept separate for readability) ---

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
  }
];

const posterDesignProjects = [
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

// --- Utility Functions ---
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

// --- Framer Motion Variants ---
const slideUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const mobileMenuVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 20 } },
  exit: { opacity: 0, x: "100%", transition: { type: "spring", stiffness: 120, damping: 20 } },
};


export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    // Primary background for the entire portfolio using F3F3E0
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: '#F3F3E0', color: '#183B4E' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo/Name - Left side */}
          <a href="#profile" className="text-2xl font-bold transition-colors duration-300" style={{ color: '#27548A', '&:hover': { color: '#183B4E' } }}>
            Marl Joshua
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {["profile", "certifications", "projects", "poster designs", "web designs", "tools"].map((section) => (
              <a
                key={section}
                href={`#${section.replace(/\s+/g, '-')}`}
                className="relative uppercase font-medium tracking-wide transition-colors duration-300 px-3 py-2 group text-base"
                style={{ color: '#183B4E', '&:hover': { color: '#27548A' } }}
              >
                <span className="relative z-10">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-in-out" style={{ backgroundColor: '#27548A' }}></span>
              </a>
            ))}
          </div>

          {/* Mobile Burger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none focus:ring-2 rounded-md p-2 transition-colors duration-200"
              style={{ color: '#183B4E', '&:hover': { color: '#27548A' }, focusRingColor: '#27548A' }}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={mobileMenuVariants}
              className="md:hidden fixed inset-0 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8 py-20"
              style={{ backgroundColor: 'rgba(39, 84, 138, 0.95)' }} // 27548A with 95% opacity
            >
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white rounded-md p-2"
                aria-label="Close navigation menu"
              >
                <FaTimes className="w-8 h-8" />
              </button>
              {["profile", "certifications", "projects", "poster designs", "web designs", "tools"].map((section) => (
                <a
                  key={section}
                  href={`#${section.replace(/\s+/g, '-')}`}
                  onClick={handleNavLinkClick}
                  className="text-3xl font-semibold hover:text-gray-200 transition-colors duration-300 py-2"
                  style={{ color: '#F3F3E0' }} // Text color for mobile menu items
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer for fixed nav */}
      <div className="h-20" />

      {/* Profile Section */}
      <motion.section
        id="profile"
        className="max-w-6xl mx-auto px-4 py-16 md:py-24 text-center relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
      >
        <div className="flex flex-col items-center gap-6">
          <img
            src="https://m.media-amazon.com/images/M/MV5BOTZhNDgwYmItMTdlZi00NDJlLWJlZWEtYmFlODE5MTBkYmIwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
            alt="Profile of Marl"
            className="w-48 h-64 sm:w-64 sm:h-80 object-cover mb-8 rounded-xl shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500 ease-in-out"
          />
          <p className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4" style={{ color: '#183B4E' }}>
            Hi, I'm <span style={{ color: '#27548A' }}>Marl Joshua</span>
          </p>
          <p className="text-lg sm:text-xl max-w-2xl mx-auto mb-8" style={{ color: '#4A4A4A' }}>
            A passionate Computer Science Graduate, UI/UX Designer and Web Developer dedicated to building modern, responsive, and user-centric applications. My expertise spans across **React**, **JavaScript**, and various other cutting-edge web technologies.
          </p>
          <div className="flex flex-wrap justify-center gap-5 mt-4">
            <a
              href="https://www.facebook.com/bakus.abnuy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125"
              style={{ color: '#27548A' }} // Using accent blue for social icons
            >
              <FaFacebook className="w-7 h-7" />
            </a>
            <a
              href="https://www.instagram.com/who0is_marl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125"
              style={{ color: '#DDA853' }} // Using accent gold for Instagram for contrast
            >
              <FaInstagram className="w-7 h-7" />
            </a>
            <a
              href="https://www.linkedin.com/in/marl-joshua-banaguas-86a34826b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125"
              style={{ color: '#27548A' }}
            >
              <FaLinkedin className="w-7 h-7" />
            </a>
            <a
              href="https://github.com/Sushi1-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125"
              style={{ color: '#183B4E' }} // Using dark blue for GitHub
            >
              <FaGithub className="w-7 h-7" />
            </a>
          </div>
        </div>
      </motion.section>

      {/* Certifications Section */}
      <motion.section
        id="certifications"
        className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-20"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={slideUp}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 border-b-4 pb-2 inline-block" style={{ color: '#183B4E', borderColor: '#27548A' }}>Certifications</h2>

        <motion.ul
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12"
          variants={container}
        >
          {/* Certification Card 1 */}
          <motion.li
            className="flex flex-col bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
            variants={item}
          >
            <div className="flex-shrink-0 mb-6 rounded-lg p-2 border" style={{ backgroundColor: '#F3F3E0', borderColor: '#DDA853' }}>
              <img
                src="https://i.imgur.com/XEo2GOl.jpeg"
                alt="Most Innovative Project & Study | Research Symposium Certificate"
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow items-center text-center">
                <p className="font-bold text-lg sm:text-xl mb-2" style={{ color: '#183B4E' }}>Most Innovative Project & Study | Research Symposium</p>
                <p className="text-sm mb-4" style={{ color: '#4A4A4A' }}>Received: <span className="font-medium">2024</span></p>
                <a
                    href="https://i.imgur.com/XEo2GOl.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 text-sm shadow-md hover:shadow-lg"
                    style={{ backgroundColor: '#27548A', '&:hover': { backgroundColor: '#183B4E' } }}
                >
                    View Certificate
                </a>
            </div>
          </motion.li>

          {/* Certification Card 2 */}
          <motion.li
            className="flex flex-col bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
            variants={item}
          >
            <div className="flex-shrink-0 mb-6 rounded-lg p-2 border" style={{ backgroundColor: '#F3F3E0', borderColor: '#DDA853' }}>
              <img
                src="https://i.imgur.com/sNSpNOI.jpeg"
                alt="Penetration Testing With Ethical Hacking Training - NexusCloud IT Solutions Certificate"
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow items-center text-center">
                <p className="font-bold text-lg sm:text-xl mb-2" style={{ color: '#183B4E' }}>Penetration Testing With Ethical Hacking Training</p>
                <p className="text-sm mb-4" style={{ color: '#4A4A4A' }}>Completed: <span className="font-medium">2025</span> | <span style={{ color: '#27548A' }}>NexusCloud IT Solutions</span></p>
                <a
                    href="https://i.imgur.com/sNSpNOI.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 text-sm shadow-md hover:shadow-lg"
                    style={{ backgroundColor: '#27548A', '&:hover': { backgroundColor: '#183B4E' } }}
                >
                    View Certificate
                </a>
            </div>
          </motion.li>

          {/* Certification Card 3 */}
          <motion.li
            className="flex flex-col bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden p-6"
            variants={item}
          >
            <div className="flex-shrink-0 mb-6 rounded-lg p-2 border" style={{ backgroundColor: '#F3F3E0', borderColor: '#DDA853' }}>
              <img
                src="https://i.imgur.com/3ReV0Wd.jpeg"
                alt="Cisco Certified Network Associate Training | NexusCloud IT Solutions Certificate"
                className="w-full h-auto object-cover rounded-lg"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col flex-grow items-center text-center">
                <p className="font-bold text-lg sm:text-xl mb-2" style={{ color: '#183B4E' }}>Cisco Certified Network Associate Training</p>
                <p className="text-sm mb-4" style={{ color: '#4A4A4A' }}>Completed: <span className="font-medium">2025</span> | <span style={{ color: '#27548A' }}>NexusCloud IT Solutions</span></p>
                <a
                    href="https://i.imgur.com/3ReV0Wd.jpeg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-300 text-sm shadow-md hover:shadow-lg"
                    style={{ backgroundColor: '#27548A', '&:hover': { backgroundColor: '#183B4E' } }}
                >
                    View Certificate
                </a>
            </div>
          </motion.li>
        </motion.ul>
      </motion.section>

      {/* Projects Section */}
      <motion.section
        id="projects"
        className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={slideUp}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 border-b-4 pb-2 inline-block" style={{ color: '#183B4E', borderColor: '#27548A' }}>Code Projects</h2>

        {projects.length === 0 ? (
          <p className="text-lg" style={{ color: '#4A4A4A' }}>Loading projects from GitHub...</p>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
            variants={container}
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between border"
                style={{ borderColor: '#F3F3E0' }} // Border matches light background
                variants={item}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center mb-4 gap-4 group"
                >
                  <img
                    src={project.avatar}
                    alt={project.owner}
                    className="w-12 h-12 rounded-full border-2 transition-colors duration-300"
                    style={{ borderColor: '#DDA853', '&:hover': { borderColor: '#27548A' } }}
                  />
                  <h3 className="text-xl font-bold group-hover:text-blue-700 transition-colors duration-300" style={{ color: '#183B4E', '&:hover': { color: '#27548A' } }}>{project.name}</h3>
                </a>
                <p className="mb-4 min-h-[4rem] text-sm md:text-base leading-relaxed" style={{ color: '#4A4A4A' }}>
                  {project.description || "No description provided."}
                </p>
                <div className="flex justify-between items-center text-sm mb-6" style={{ color: '#4A4A4A' }}>
                  <span className="flex items-center gap-1">
                    <svg className="w-4 h-4" style={{ color: '#DDA853' }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.538 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.538-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.381-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path></svg>
                    {project.stars}
                  </span>
                  <span className="font-medium" style={{ color: '#27548A' }}>{project.language || "N/A"}</span>
                </div>
                {project.liveUrl ? (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 text-base shadow-md hover:shadow-lg mt-auto"
                    style={{ backgroundColor: '#27548A', '&:hover': { backgroundColor: '#183B4E' } }}
                  >
                    Try Live Demo
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-block text-center text-gray-600 font-semibold py-2.5 px-6 rounded-lg cursor-not-allowed text-base mt-auto"
                    style={{ backgroundColor: '#D4D4D4', color: '#888' }} // Adjust disabled button color
                  >
                    No Live Demo
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.section>

      {/* Poster Designs Section */}
      <motion.section
        id="poster-designs"
        className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={slideUp}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 border-b-4 pb-2 inline-block" style={{ color: '#183B4E', borderColor: '#27548A' }}>Poster Designs</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10"
          variants={container}
        >
          {posterDesignProjects.map(({ id, title, image, description, liveUrl }) => (
            <motion.div
              key={id}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between border"
              style={{ borderColor: '#F3F3E0' }}
              variants={item}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#183B4E' }}>{title}</h3>
                <p className="text-sm md:text-base leading-relaxed mb-4 flex-grow" style={{ color: '#4A4A4A' }}>
                  {description}
                </p>
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 text-base shadow-md hover:shadow-lg mt-auto"
                    style={{ backgroundColor: '#27548A', '&:hover': { backgroundColor: '#183B4E' } }}
                  >
                    View Design
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-block text-center text-gray-600 font-semibold py-2.5 px-6 rounded-lg cursor-not-allowed text-base mt-auto"
                    style={{ backgroundColor: '#D4D4D4', color: '#888' }}
                  >
                    No Live Demo
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Web Designs Section */}
      <motion.section
        id="web-designs"
        className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-5"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={slideUp}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 border-b-4 pb-2 inline-block" style={{ color: '#183B4E', borderColor: '#27548A' }}>Web Designs</h2>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10"
          variants={container}
        >
          {designProjects.map(({ id, title, image, description, liveUrl }) => (
            <motion.div
              key={id}
              className="bg-white rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between border"
              style={{ borderColor: '#F3F3E0' }}
              variants={item}
            >
              <img
                src={image}
                alt={title}
                className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
              />
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-2" style={{ color: '#183B4E' }}>{title}</h3>
                <p className="text-sm md:text-base leading-relaxed mb-4 flex-grow" style={{ color: '#4A4A4A' }}>
                  {description}
                </p>
                {liveUrl ? (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center text-white font-semibold py-2.5 px-6 rounded-lg transition-colors duration-300 text-base shadow-md hover:shadow-lg mt-auto"
                    style={{ backgroundColor: '#27548A', '&:hover': { backgroundColor: '#183B4E' } }}
                  >
                    View Design
                  </a>
                ) : (
                  <button
                    disabled
                    className="inline-block text-center text-gray-600 font-semibold py-2.5 px-6 rounded-lg cursor-not-allowed text-base mt-auto"
                    style={{ backgroundColor: '#D4D4D4', color: '#888' }}
                  >
                    No Live Demo
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Tools Section */}
      <motion.section
        id="tools"
        className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-0"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={slideUp}
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 border-b-4 pb-2 inline-block" style={{ color: '#183B4E', borderColor: '#27548A' }}>Tools I Use</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">

          {/* WebDev Tools */}
          <motion.div className="bg-white rounded-xl shadow-xl p-8" variants={item}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 border-b-2 pb-3" style={{ color: '#183B4E', borderColor: '#DDA853' }}>Web Development</h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/fWRnBaX.png" alt="Javascript" className="w-16 h-8 sm:w-20 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>JavaScript</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/p50Qdqz.png" alt="HTML" className="w-16 h-8 sm:w-20 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>HTML5</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/R0MUf0G.png" alt="CSS" className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>CSS3</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/p84qlZF.png" alt="React" className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>React.js</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/U52GWbJ.png" alt="Vite" className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>Vite</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/hzIN8ss.png" alt="Tailwind CSS" className="w-8 h-8 sm:w-10 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>Tailwind CSS</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/z1fScsK.png" alt="GitHub" className="w-16 h-8 sm:w-20 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>GitHub</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/PFhP5CL.png" alt="Firebase" className="w-16 h-8 sm:w-20 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>Firebase</span>
              </div>
            </div>
          </motion.div>

          {/* Design Tools */}
          <motion.div className="bg-white rounded-xl shadow-xl p-8" variants={item}>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 border-b-2 pb-3" style={{ color: '#183B4E', borderColor: '#DDA853' }}>Design & Creative</h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/qKMRYbC.png" alt="Canva" className="w-16 h-8 sm:w-20 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>Canva</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/D6UyNPW.png" alt="Figma" className="w-20 h-8 sm:w-25 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>Figma</span>
              </div>
              <div className="flex flex-col items-center p-3 sm:p-4 w-28">
                <img src="https://i.imgur.com/b5e3pj5.png" alt="Photoshop" className="w-20 h-8 sm:w-25 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                <span className="text-sm font-medium" style={{ color: '#4A4A4A' }}>Adobe Photoshop</span>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-10 mt-20" style={{ backgroundColor: '#183B4E', color: '#F3F3E0' }}>
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Marl Joshua. All rights reserved.</p>
          <div className="flex justify-center space-x-6 mt-4">
            <a
              href="https://www.facebook.com/bakus.abnuy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-500 transition-colors duration-300"
              style={{ color: '#F3F3E0', '&:hover': { color: '#27548A' } }}
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/who0is_marl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-500 transition-colors duration-300"
              style={{ color: '#F3F3E0', '&:hover': { color: '#DDA853' } }}
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/marl-joshua-banaguas-86a34826b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-blue-600 transition-colors duration-300"
              style={{ color: '#F3F3E0', '&:hover': { color: '#27548A' } }}
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Sushi1-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-gray-200 transition-colors duration-300"
              style={{ color: '#F3F3E0', '&:hover': { color: '#DDA853' } }}
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}