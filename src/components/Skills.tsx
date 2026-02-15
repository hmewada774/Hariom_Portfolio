
import React, { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import "./Skills.css";

interface SkillRow {
  title: string;
  items: { name: string; level: number }[];
}

/* 🔹 FLOATING ICON SKILLS (LOGOS) */
const SKILLS = [
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "C", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
  { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "HTML", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Linux", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "github", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
];

/* 🔹 SKILL TABLE (YOUR REAL SKILLS) */
const ROWS: SkillRow[][] = [
  [
    {
      title: "Programming Languages",
      items: [
        { name: "C++ Programming", level: 95 },
        { name: "C Programming", level: 85 },
        { name: "Python Programming", level: 90 },
        { name: "Java Programming", level: 80 },
        { name: "SQL", level: 85 },
      ],
    },
    {
      title: "Web & Frontend Development",
      items: [
        { name: "HTML & CSS", level: 95 },
        { name: "JavaScript", level: 90 },
        { name: "React.js & Vite", level: 85 },
        { name: "Responsive Web Design", level: 95 },
        { name: "Frontend Development", level: 90 },
      ],
    },
    {
      title: "Cyber Security & Defense",
      items: [
        { name: "Network Security", level: 90 },
        { name: "Cryptography (AES, DES, ECC)", level: 85 },
        { name: "Vulnerability Assessment", level: 88 },
        { name: "IoT & Secure System Design", level: 82 },
        { name: "Bug Hunting & CTF Solving", level: 80 },
      ],
    },
  ],
  [
    {
      title: "Cloud & Certifications",
      items: [
        { name: "AWS Cloud Security", level: 90 },
        { name: "AWS Cloud Practitioner Essentials", level: 85 },
        { name: "Google IT Support", level: 92 },
        { name: "Identity & Access Management (IAM)", level: 85 },
        { name: "Cloud Security Principles", level: 88 },
      ],
    },
    {
      title: "AI & Research",
      items: [
        { name: "Artificial Intelligence Fundamentals", level: 85 },
        { name: "Generative AI Applications", level: 80 },
        { name: "AI-Based Risk Detection Systems", level: 82 },
        { name: "Academic Research Writing", level: 90 },
        { name: "Security Research", level: 88 },
      ],
    },
    {
      title: "Tools & Professional Skills",
      items: [
        { name: "Git & GitHub", level: 95 },
        { name: "Linux Administration", level: 90 },
        { name: "Problem Solving & Logic", level: 95 },
        { name: "Technical Documentation", level: 90 },
        { name: "Project Deployment", level: 85 },
      ],
    },
  ],
];

/* 🔹 ANIMATIONS */
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Skills = ({ theme }: { theme: "light" | "dark" }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const isInView = useInView(stageRef, { once: true });

  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  useEffect(() => {
    if (!isInView) return;

    const calculatePositions = () => {
      const stage = stageRef.current;
      if (!stage) return;

      const circles = Array.from(stage.querySelectorAll(".skill-circle")) as HTMLDivElement[];
      const rect = stage.getBoundingClientRect();
      const isMobile = window.innerWidth <= 768;

      // If rect is not ready yet, retry in a bit
      if (rect.width === 0) {
        setTimeout(calculatePositions, 100);
        return;
      }

      const placed: { x: number; y: number; size: number }[] = [];
      const buffer = isMobile ? 15 : 40; // Smaller buffer on mobile

      circles.forEach((circle: HTMLDivElement) => {
        const size = circle.offsetWidth || (isMobile ? 80 : 110);
        let x = 0, y = 0, tries = 0;

        do {
          x = Math.random() * (rect.width - size);
          y = Math.random() * (rect.height - size);
          tries++;
        } while (placed.some((p) => Math.hypot(p.x - x, p.y - y) < p.size / 2 + size / 2 + buffer) && tries < 150);

        placed.push({ x, y, size });
        circle.style.left = `${x}px`;
        circle.style.top = `${y}px`;

        const dx = (Math.random() - 0.5) * (isMobile ? 40 : 80);
        const dy = (Math.random() - 0.5) * (isMobile ? 40 : 80);

        circle.animate(
          [{ transform: "translate(0,0)" }, { transform: `translate(${dx}px,${dy}px)` }],
          { duration: 6000, direction: "alternate", iterations: Infinity, easing: "ease-in-out" }
        );
      });
    };

    calculatePositions();
    window.addEventListener('resize', calculatePositions);
    return () => window.removeEventListener('resize', calculatePositions);
  }, [isInView]);

  return (
    <section id="skills" className="skills-container">
      <motion.div className="skills-header" variants={fadeUp} initial="hidden" animate={controls}>
        <h2 className="skills-title">
          My <span className="grad">Skills</span>
        </h2>
        <div className="skills-underline" />
        <p className="skills-description">
          Cyber Security • Cloud • AI • Research • Real-World Systems
        </p>
      </motion.div>

      {/* FLOATING ICON CLOUD */}
      <motion.div
        ref={stageRef}
        className="skills-stage"
        variants={container}
        initial="hidden"
        animate={controls}
      >
        {SKILLS.map((s) => (
          <motion.div key={s.name} className="skill-circle" variants={fadeUp} whileHover={{ scale: 1.3 }}>
            <img src={s.logo} className="skill-logo" alt={s.name} />
            <span className="skill-name">{s.name}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* SKILL TABLE */}
      <div className="skills-table">
        {ROWS.map((row, i) => (
          <div key={i} className="skills-row">
            {row.map((col) => (
              <motion.div
                key={col.title}
                className="skill-box"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <h3>{col.title}</h3>
                <ul>
                  {col.items.map((item, j) => (
                    <li key={j} className="skill-item">
                      <div className="skill-item-header">
                        <span>{item.name}</span>
                        <span className="skill-percent">{item.level}%</span>
                      </div>
                      <div className="skill-progress">
                        <div className="skill-progress-fill" style={{ width: `${item.level}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
