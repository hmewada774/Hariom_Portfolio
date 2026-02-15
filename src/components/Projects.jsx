import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import "./projects.css";

const PROJECTS = [
  {
    title: "Toppers Point Coaching Classes",
    desc: "A modern, responsive educational platform designed for a coaching institute. Features course management, faculty profiles, and a smooth user experience across all devices.",
    ss: "/tp.png",
    tech: ["HTML", "CSS", "JavaScript", "Modern UI/UX"],
    live: "#",
    code: "https://github.com/hmewada774/Toppers-point",
  },
  {
    title: "IoT Security & Authentication",
    desc: "C++ implementation of secure IoT authentication using TOTP, XOR encryption, and ECC-based key exchange protocols for device registration.",
    ss: "/iot.png",
    tech: ["XOR Encryption", "TOTP Generation", "ECC Key Exchange", "Device Auth Simulation"],
    live: "#",
    code: "https://github.com/hmewada774/IoT-Security-Auth-Project",
  },
  {
    title: "FileEncryptor-GUI",
    desc: "A simple Python GUI tool to encrypt and decrypt files with a custom integer key. It uses a basic byte-shift encryption plus random padding for file size obfuscation.",
    ss: "/enc.png",
    tech: ["GUI built with Tkinter", "Encrypt and decrypt files with a custom key", "Hides original file during encryption", "Adds random padding for extra protection"],
    live: "#",
    code: "https://github.com/hmewada774/FileEncryptor-GUI",
  },
  {
    title: "💼 Portfolio Website",
    desc: "Modern portfolio built with React + Framer Motion with smooth animations and clean UI.",
    ss: "/port.png",
    tech: ["React", "Framer Motion", "Tailwind CSS"],
    live: "#",
    code: "https://github.com/hmewada774/portfolio",
  },
  {
    title: "WanderNest | Airbnb Clone",
    desc: "Full-stack travel listing application with user authentication, reviews, image uploads via Cloudinary, and MongoDB database integration.",
    ss: "/airbnb.png",
    tech: ["Node.js", "Express", "EJS", "Cloudinary", "MongoDB", "JavaScript"],
    live: "https://airbnb-i8sw.onrender.com/",
    code: "https://github.com/hmewada774/Full-Stack-Airbnb-Style-App-WanderNest-Find-your-next-cozy-stay-anywhere.",
  },
  {
    title: "cryptography-algorithms-cpp",
    desc: "A comprehensive C++ cryptography repository implementing classical ciphers, modern encryption algorithms, and security protocols.Designed for cybersecurity students, cryptography learners, and information security researchers.🔐 Cryptography Algorithms Implemented in C++",
    ss: "/crypt.png",
    tech: ["Classical Cryptography", "Symmetric Key Cryptography", "Asymmetric Key Cryptography", "Authentication & Security Protocols", "Using C++ (Standard Library)"],
    live: "#",
    code: "https://github.com/hmewada774/cryptography-algorithms-cpp",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-20% 0px" });

  return (
    <motion.section
      ref={sectionRef}
      className="projects-container"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      id="projects"
    >
      <motion.div
        className="projects-card"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.18 } },
        }}
      >
        {/* Title Animation */}
        <motion.h2
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="projects-title"
        >
          🚀My <span className="proj">Projects</span>
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          className="projects-subtitle"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
        >
          A collection of my major works — blending research and innovation.
        </motion.p>

        {/* Grid */}
        <div className="projects-grid">
          {PROJECTS.map((p, idx) => (
            <motion.div
              key={idx}
              className="project-card"
              variants={{
                hidden: { opacity: 0, y: 40, scale: 0.9 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.45,
                    ease: "easeOut",
                    delay: idx * 0.1,
                  },
                },
              }}
              whileHover={{ scale: 1.04 }}
            >
              <motion.div
                className="project-image-wrapper"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img src={p.ss} alt={p.title} className="project-image" />
              </motion.div>

              <div className="project-content">
                <h3 className="project-heading">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>

                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span key={t} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <motion.a
                    href={p.code}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="code-btn"
                  >
                    <Github size={14} /> Code
                  </motion.a>

                  <motion.a
                    href={p.live}
                    target="_blank"
                    whileHover={{ scale: 1.08 }}
                    className="live-btn"
                  >
                    <ExternalLink size={14} /> Live
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
