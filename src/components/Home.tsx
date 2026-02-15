import React, { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import "./Home.css";

const githubLogo = "/github.png";
const linkedinLogo = "/linkedin.png";
const gmailLogo = "/gmail.png";
const instagramLogo = "/insta.png";
const facebookLogo = "/facebook.png";
const leetcodeLogo = "/thm.png";
const whatsappLogo = "/whatsapp.png";

interface HeroProps {
  theme: "light" | "dark"; // pass theme from global state
}

export function Home({ theme }: HeroProps) {
  const roles = [
    "Cyber Security Enthusiast",
    "Ethical Hacker",
    "Full Stack Web Developer",
    "Security Researcher",
    "Cryptography Practitioner",
    "IoT Security Developer",
    "Bug Bounty Learner",
    "Penetration Testing Enthusiast",
    "AI for Security Explorer",
    "Python Security Tool Developer",
    "C & C++ Systems Programmer",
    "Java Development",
    "Research Paper Author",
    "Problem Solver",
    "Tech Innovator",
  ];

  const connectLinks = [
    { img: linkedinLogo, link: "https://www.linkedin.com/in/hariom-mewada-cybersecurity/" },
    { img: gmailLogo, link: "mailto:hariom.mewada@gmail.com" },
    { img: whatsappLogo, link: "https://wa.me/+918959437871" },
    { img: instagramLogo, link: "https://www.instagram.com/_wishmaster_hariom_/" },
    { img: facebookLogo, link: "https://www.facebook.com/hariom.mewada" },
  ];

  const workLinks = [
    { img: githubLogo, link: "https://github.com/hmewada774" },
    { img: leetcodeLogo, link: "https://tryhackme.com/p/HariomMewada" },
  ];

  const [typedRoles, setTypedRoles] = useState("");
  const rolesText = "Cyber Security Enthusiast | Full Stack Web Developer | C/C++ • Java • Linux | Network Security | Google Cloud & AWS Certified";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setTypedRoles(rolesText.slice(0, i + 1));
      i++;
      if (i === rolesText.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, when: "beforeChildren" } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  };


  return (
    <section id="home" className="hero">
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${theme === "light" ? "/j2.png" : "/hero2.png"})`,
        }}
      />

      <motion.div className="hero-content" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1 className="hero-name" variants={itemVariants}>
          Hi! I’m <br />
          <span className="gradient-text hero-name-line">Hariom Mewada</span>
          <motion.div className="hero-line" variants={itemVariants} />
        </motion.h1>

        <motion.p className="hero-intro typing-effect" variants={itemVariants}>
          {typedRoles}
        </motion.p>

        <motion.p className="hero-intro" variants={itemVariants}>
          Mastering Cyber Security & AI Systems.
          Building secure, intelligent, real-world solutions.
          Transforming complex problems into impactful technology.
          Building modern web experiences.
        </motion.p>

        <motion.div className="hero-roles" variants={itemVariants}>
          {roles.map((r, i) => (
            <motion.div key={i} className="role-tag" variants={itemVariants}>
              {r}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-info" variants={itemVariants}>
          {[
            { label: "📍 Location", value: "Ashta, Madhya Pradesh, India" },
            { label: "💼 Expertise", value: "Cyber Security, AI/ML, Problem Solving" },
            { label: "📞 Contact", value: "hmewada774@gmail.com" },
          ].map((info, i) => (
            <motion.div key={i} className="info-card" whileHover={{ scale: 1.05, y: -3 }} variants={itemVariants}>
              <h4>{info.label}</h4>
              <p>{info.value}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="hero-socials" variants={itemVariants}>
          <div className="social-group">
            <h5>Connect with me</h5>
            <div className="social-icons">
              {connectLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  variants={itemVariants}
                >
                  <img src={s.img} className="social-icon" alt="" />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="social-group">
            <h5>My Tracks</h5>
            <div className="social-icons">
              {workLinks.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 3 }}
                  variants={itemVariants}
                >
                  <img src={s.img} className="social-icon" alt="" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="hero-arrow"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          variants={itemVariants}
        >
          <ArrowDown size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
}
