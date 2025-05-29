import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { FaFacebook, FaInstagram, FaWhatsapp, FaTelegram, FaLinkedin, FaGithub, FaBars, FaTimes } from 'react-icons/fa';

// --- Configuration Data (Keeping as is) ---
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

const certifications = [
  {
    id: 1,
    title: "Most Innovative Project & Study | Research Symposium",
    image: "https://i.imgur.com/XEo2GOl.jpeg",
    received: "2024",
    issuer: null,
    url: "https://i.imgur.com/XEo2GOl.jpeg",
  },
  {
    id: 2,
    title: "Penetration Testing With Ethical Hacking Training",
    image: "https://i.imgur.com/sNSpNOI.jpeg",
    completed: "2025",
    issuer: "NexusCloud IT Solutions",
    url: "https://i.imgur.com/sNSpNOI.jpeg",
  },
  {
    id: 3,
    title: "Cisco Certified Network Associate Training",
    image: "https://i.imgur.com/3ReV0Wd.jpeg",
    completed: "2025",
    issuer: "NexusCloud IT Solutions",
    url: "https://i.imgur.com/3ReV0Wd.jpeg",
  },
];

const webDevTools = [
  { name: "JavaScript", image: "https://i.imgur.com/fWRnBaX.png" },
  { name: "HTML5", image: "https://i.imgur.com/p50Qdqz.png" },
  { name: "CSS3", image: "https://i.imgur.com/R0MUf0G.png" },
  { name: "React.js", image: "https://i.imgur.com/p84qlZF.png" },
  { name: "Vite", image: "https://i.imgur.com/U52GWbJ.png" },
  { name: "Tailwind CSS", image: "https://i.imgur.com/hzIN8ss.png" },
  { name: "GitHub", image: "https://i.imgur.com/z1fScsK.png" },
  { name: "Firebase", image: "https://i.imgur.com/PFhP5CL.png" },
];

const designTools = [
  { name: "Canva", image: "https://i.imgur.com/qKMRYbC.png" },
  { name: "Adobe Photoshop", image: "https://i.imgur.com/b5e3pj5.png" },
  { name: "Figma", image: "https://i.imgur.com/D6UyNPW.png" },
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

// --- Particle Canvas Component ---
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  const createParticle = useCallback((ctx) => {
    return {
      x: Math.random() * ctx.canvas.width,
      y: Math.random() * ctx.canvas.height,
      radius: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.5, // Slower movement
      dy: (Math.random() - 0.5) * 0.5,
      alpha: Math.random() * 0.7 + 0.3, // Varying transparency
    };
  }, []);

  const drawParticles = useCallback((ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.globalCompositeOperation = 'lighter'; // Makes particles blend with light

    particlesRef.current.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`; // White particles
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      // Wrap particles around edges
      if (p.x < 0 || p.x > ctx.canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > ctx.canvas.height) p.dy *= -1;
    });

    requestAnimationFrame(() => drawParticles(ctx));
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = document.body.scrollHeight; // Cover entire scrollable height

    const numParticles = Math.floor((canvas.width * canvas.height) / 30000); // Responsive particle count
    particlesRef.current = Array.from({ length: numParticles }, () => createParticle(ctx));

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      const newNumParticles = Math.floor((canvas.width * canvas.height) / 30000);
      particlesRef.current = Array.from({ length: newNumParticles }, () => createParticle(ctx));
    };

    window.addEventListener('resize', handleResize);
    drawParticles(ctx);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [createParticle, drawParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0"
      style={{ opacity: 0.1 }} // Subtle opacity
    ></canvas>
  );
};

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const profileRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: profileRef, offset: ["start end", "end start"] });

  // Parallax for background of profile section
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]); // Moves background up by 50% of its height

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

  const handleNavLinkClick = () => setIsMobileMenuOpen(false);

  const primaryBgColor = '#0F172A'; // Even darker slate blue for depth
  const secondaryBgColor = '#1E293B'; // Dark blue-gray for cards
  const accentColor = '#67E8F9';      // Vibrant Cyan for highlights (modern & techy)
  const primaryTextColor = '#F1F5F9'; // Near-white for general text
  const secondaryTextColor = '#94A3B8'; // Muted blue-gray for descriptions
  const buttonBgColor = '#3B82F6';    // Bright Blue for primary buttons
  const buttonHoverBgColor = '#2563EB'; // Darker blue on hover
  const borderColor = '#334155';      // Darker gray for subtle borders
  const highlightColor = '#FDE047';   // Bright Yellow for stars/special accents (more pop)

  const SectionHeading = ({ children }) => (
    <h2 className="text-3xl sm:text-4xl font-extrabold mb-14 pb-3 relative inline-block group"
        style={{ color: primaryTextColor }}>
      {children}
      <span className="absolute bottom-0 left-1/2 w-0 h-1 bg-gradient-to-r from-cyan-400 to-sky-500 transform -translate-x-1/2 group-hover:w-full transition-all duration-500"></span>
    </h2>
  );

  const ProjectCard = ({ title, image, description, liveUrl, TypeIcon }) => (
    <motion.div
      className="rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between transform hover:-translate-y-2 relative group cursor-pointer"
      style={{ backgroundColor: secondaryBgColor, border: `1px solid ${borderColor}` }}
      variants={item}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)" }}
      // For more advanced hover effects (e.g., light shimmer) you'd need a separate component or more complex CSS/JS
    >
      <img
        src={image}
        alt={title}
        className="w-full h-56 object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2" style={{ color: primaryTextColor }}>{title}</h3>
        <p className="text-sm md:text-base leading-relaxed mb-4 flex-grow" style={{ color: secondaryTextColor }}>
          {description}
        </p>
        {liveUrl ? (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center font-semibold py-2.5 px-6 rounded-lg transition-all duration-300 text-base shadow-md hover:shadow-lg mt-auto relative overflow-hidden"
            style={{ backgroundColor: buttonBgColor, color: primaryTextColor }}
          >
            <span className="relative z-10">{TypeIcon ? <TypeIcon className="inline-block mr-2" /> : null} View</span>
            {/* Shimmer effect on hover */}
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
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen font-sans antialiased relative overflow-hidden" style={{ backgroundColor: primaryBgColor, color: primaryTextColor }}>
      {/* Particle Background */}
      <ParticleCanvas />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-gray-950/80 backdrop-blur-md shadow-lg z-50 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          {/* Logo/Name */}
          <a href="#profile" className="text-2xl font-bold transition-colors duration-300 relative group" style={{ color: primaryTextColor }}>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-sky-500">Marl Joshua</span>
            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-sky-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-6 lg:space-x-8">
            {["profile", "certifications", "projects", "poster designs", "web designs", "tools"].map((section) => (
              <a
                key={section}
                href={`#${section.replace(/\s+/g, '-')}`}
                className="relative uppercase font-medium tracking-wide transition-colors duration-300 px-3 py-2 group text-base text-gray-300 hover:text-white"
              >
                <span className="relative z-10">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
                <span className="absolute left-0 bottom-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 ease-in-out bg-gradient-to-r from-cyan-400 to-sky-500"></span>
              </a>
            ))}
          </div>

          {/* Mobile Burger Icon */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="focus:outline-none focus:ring-2 rounded-md p-2 transition-colors duration-200 text-gray-300 hover:text-white focus:ring-blue-500"
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
              className="md:hidden fixed inset-0 backdrop-blur-md z-[100] flex flex-col items-center justify-center space-y-8 py-20"
              style={{ backgroundColor: primaryBgColor + 'E0' }} // Add transparency
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
                  className="text-3xl font-semibold hover:text-gray-200 transition-colors duration-300 py-2 text-white drop-shadow-md"
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

      {/* --- ALL PORTFOLIO SECTIONS START HERE --- */}

      {/* Profile Section */}
      <motion.section
        id="profile"
        ref={profileRef}
        className="relative max-w-6xl mx-auto px-4 py-16 md:py-24 text-center overflow-hidden z-10 rounded-xl my-8 shadow-2xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeIn}
        style={{ backgroundColor: secondaryBgColor }}
      >
        {/* Animated Gradient Background */}
        <motion.div
          className="absolute inset-0 z-0 opacity-40 rounded-xl"
          style={{
            background: 'linear-gradient(45deg, rgba(103,232,249,0.3) 0%, rgba(59,130,246,0.3) 50%, rgba(139,92,246,0.3) 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-animation 15s ease infinite',
            y: yBg // Parallax effect
          }}
        ></motion.div>
        {/* Subtle pattern over gradient */}
        <div className="absolute inset-0 pattern-dots-md opacity-10 z-0" style={{ color: secondaryTextColor }}></div>

        <div className="relative flex flex-col items-center gap-6 z-10">
          <motion.img
            src="https://i.imgur.com/EOwF6pK.jpeg"
            alt="Profile of Marl"
            className="w-48 h-64 sm:w-64 sm:h-80 object-cover mb-8 rounded-xl shadow-2xl border-4 border-cyan-500 transform hover:scale-105 transition-transform duration-500 ease-in-out"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          />
          <motion.p
            className="text-4xl sm:text-6xl font-extrabold leading-tight mb-4"
            style={{ color: primaryTextColor }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Hi, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">Marl Joshua</span>
          </motion.p>
          <motion.p
            className="text-lg sm:text-xl max-w-2xl mx-auto mb-8"
            style={{ color: secondaryTextColor }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            A passionate Computer Science Graduate, UI/UX Designer, and Web Developer dedicated to building modern, responsive, and user-centric applications. My expertise spans across React, JavaScript, and various other cutting-edge web technologies.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-5 mt-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
          >
            <a
              href="https://www.facebook.com/bakus.abnuy/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="p-3 rounded-full bg-blue-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-blue-800 social-icon-hover"
            >
              <FaFacebook className="w-6 h-6" />
            </a>
            <a
              href="https://www.instagram.com/who0is_marl/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-3 rounded-full bg-pink-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-pink-800 social-icon-hover"
            >
              <FaInstagram className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/marl-joshua-banaguas-86a34826b/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="p-3 rounded-full bg-blue-800 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-blue-900 social-icon-hover"
            >
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/Sushi1-lab"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="p-3 rounded-full bg-gray-700 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-125 hover:bg-gray-800 social-icon-hover"
            >
              <FaGithub className="w-6 h-6" />
            </a>
          </motion.div>
        </div>
      </motion.section>

      {/* Certifications Section */}
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

      {/* Projects Section */}
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

      {/* Poster Designs Section */}
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

      {/* Web Designs Section */}
      <motion.section
        id="web-designs"
        className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={slideUp}
      >
        <SectionHeading>Web Designs</SectionHeading>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10" variants={container}>
          {designProjects.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.div>
      </motion.section>

      {/* Tools Section */}
      <motion.section
        id="tools"
        className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        variants={slideUp}
      >
        <SectionHeading>Tools I Use</SectionHeading>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 max-w-6xl mx-auto">

          {/* WebDev Tools */}
          <motion.div
            className="rounded-xl shadow-xl p-8 transform hover:-translate-y-1 transition-transform duration-300 relative group"
            style={{ backgroundColor: secondaryBgColor, border: `1px solid ${borderColor}` }}
            variants={item}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)" }}
          >
            {/* Subtle radial gradient background on hover */}
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-8 border-b-2 pb-3 relative inline-block group" style={{ color: primaryTextColor, borderColor: borderColor }}>
              Web Development
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-sky-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 relative z-10">
              {webDevTools.map(tool => (
                <div key={tool.name} className="flex flex-col items-center p-3 sm:p-4 w-28 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: primaryBgColor }}>
                  <img src={tool.image} alt={tool.name} className="w-16 h-8 sm:w-20 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                  <span className="text-sm font-medium" style={{ color: primaryTextColor }}>{tool.name}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Design Tools */}
          <motion.div
            className="rounded-xl shadow-xl p-8 transform hover:-translate-y-1 transition-transform duration-300 relative group"
            style={{ backgroundColor: secondaryBgColor, border: `1px solid ${borderColor}` }}
            variants={item}
            whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.15)" }}
          >
            {/* Subtle radial gradient background on hover */}
            <div className="absolute inset-0 bg-radial-gradient opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>

            <h3 className="text-2xl sm:text-3xl font-bold mb-8 border-b-2 pb-3 relative inline-block group" style={{ color: primaryTextColor, borderColor: borderColor }}>
              Design & Creative
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-fuchsia-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </h3>
            <div className="flex flex-wrap justify-center gap-6 sm:gap-8 relative z-10">
              {designTools.map(tool => (
                <div key={tool.name} className="flex flex-col items-center p-3 sm:p-4 w-28 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105" style={{ backgroundColor: primaryBgColor }}>
                  <img src={tool.image} alt={tool.name} className="w-16 h-8 sm:w-20 sm:h-10 object-contain mb-2 filter grayscale hover:grayscale-0 transition-all duration-300" loading="lazy" />
                  <span className="text-sm font-medium" style={{ color: primaryTextColor }}>{tool.name}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-gray-400 text-sm border-t border-gray-700 mt-16" style={{ backgroundColor: primaryBgColor }}>
        <p>&copy; {new Date().getFullYear()} Marl Joshua. All rights reserved.</p>
        <p className="mt-2">Built with React, Tailwind CSS, and Framer Motion.</p>
      </footer>
    </div>
  );
}