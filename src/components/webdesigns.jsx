import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../components/sectionheadings";
import {
  singleWebDesignImage,
  singleWebDesignImage1,
} from "../Constants/data";
import { slideUp, container, fallIn } from "../Constants/animation";

const WebDesigns = () => {
  const baseVideoUrl =
    "https://drive.google.com/file/d/1XoX-VkAQvgfCYDhJlj1QLZGChhH0ngYo/preview?autoplay=1&mute=1";

  const normalVideoUrl =
    "https://drive.google.com/file/d/1XoX-VkAQvgfCYDhJlj1QLZGChhH0ngYo/preview?mute=1";

  const [videoSrc, setVideoSrc] = useState(normalVideoUrl);
  const videoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideoSrc(baseVideoUrl);
        } else {
          setVideoSrc(normalVideoUrl);
        }
      },
      {
        threshold: 0.6,
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

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
          className="w-full max-w-4xl aspect-video overflow-hidden flex items-center justify-center"
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
          className="w-full max-w-4xl aspect-video overflow-hidden flex items-center justify-center"
          variants={fallIn}
        >
          <img
            src={singleWebDesignImage1}
            alt="Web Design 2"
            className="w-full h-full object-contain shadow-2xl rounded-xl"
            loading="lazy"
          />
        </motion.div>

        {/* Video (responsive + clean mobile UI) */}
        <motion.div
          ref={videoRef}
          className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
          variants={fallIn}
        >
          <iframe
            src={videoSrc}
            title="Website Demo Video"
            className="w-full h-full pointer-events-none"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default WebDesigns;