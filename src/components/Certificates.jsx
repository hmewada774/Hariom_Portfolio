import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Certificates.css";

const CERTS = {
  tech: [
    { title: "Google IT Support Certificate", org: "Google", date: "2025", img: "/certss/googleIt.png" },
    { title: "Internship Offer Letter - The Red User", org: "The Red User", date: "2025", img: "/certss/RedUse.png" },
    { title: "Internship Completion Certificate - The Red User", org: "The Red User", date: "2025", img: "/certss/RedUseLater.png" },
    { title: "Completion Advent of Cyber 2024", org: "TryHackMe", date: "2024", img: "/certss/AOC.png" },
    { title: "Social Media Cyber Security And Analysis: Level 1", org: "Alison", date: "2025", img: "/certss/ALISION.jpg" },
    { title: "Android Bug Bounty: Hunt Like A Rat", org: "EC-Council", date: "2024", img: "/certss/androidBugBounnty.png" },
    { title: "AWS Security Fundamentals", org: "AWS", date: "2025", img: "/certss/AWSsecurityFundamental.png" },
    { title: "AWS Technical Essentials", org: "AWS", date: "2025", img: "/certss/AWSTechinicalEssential.png" },
    { title: "The Bits and Bytes of Computer Network", org: "Coursera", date: "2025", img: "/certss/BitssAndBytes.png" },
    { title: "Cyber Security Job Simulation", org: "Forage", date: "2024", img: "/certss/CyberSecurityJob.png" },
    { title: "Ethical Hacker Certification", org: "Cisco", date: "2025", img: "/certss/EthicalHacker.png" },
    { title: "Geo-Data Sharing and Cyber Security", org: "ISRO", date: "2025", img: "/certss/GeoData.png" },
    { title: "Fundamentals of Cyber Security", org: "Coursera", date: "2024", img: "/certss/GoogleFundamentalSecurity.png" },
    { title: "Intellipaat Certification", org: "Intellipaat", date: "2025", img: "/certss/IntelliPaat.png" },
    { title: "MATLAB Fundamentals", org: "MathWorks", date: "2023", img: "/certss/MATLAB.jpg" },
    { title: "National Finance Literacy Quiz", org: "NISM", date: "2025", img: "/certss/NISM.png" },
    { title: "Blockchain and Applications", org: "NPTEL", date: "2025", img: "/certss/NPTEL.png" },
    { title: "OWASP Shell Zen CTF", org: "VIT Bhopal", date: "2025", img: "/certss/owsp vit ctf.png" },

  ],
  other: [
    { title: "C Programming Certification", org: "Coding-X", date: "2023", img: "/certss/C.png" },
    { title: "Cpp Programming Certification", org: "Coding-X", date: "2023", img: "/certss/Cpp.png" },
    { title: "Kaggle Badge Certificate", org: "Kaggle", date: "2024", img: "/certss/CodeForker.png" },
    { title: "Networking Essentials", org: "Cisco", date: "2025", img: "/certss/EthicalHacker2.png" },
    { title: "Java Programming Fundamentals", org: "Scaler", date: "2024", img: "/certss/java scaler.png" },
  ],
};

export default function Certificates() {
  const [tab, setTab] = useState("tech");
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <section id="certificates" className="cert-section">
      {/* SECTION ENTERS WHEN SCROLLED TO */}
      <motion.div
        className="cert-wrapper"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20% 0px" }} // triggers closer to when you reach it
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* TITLE */}
        <h2 className="cert-title">
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Certificates
          </span>
        </h2>
        <p className="cert-subtitle">
          Explore my achievements — both technical & beyond.
        </p>

        {/* TABS */}
        <div className="cert-tabs">
          {["tech", "other"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`cert-tab ${tab === t ? "active" : ""}`}
            >
              {t === "tech" ? "Technical" : "Other"}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="certs-grid">
          {CERTS[tab].map((c, i) => (
            <motion.div
              key={`${tab}-${c.title}-${i}`}
              className="cert-card"
              style={{ ["--angle"]: `${Math.random() * 8 - 4}deg` }}
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }} // each card animates when it comes in view
              transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
              onClick={() => setSelectedCert(c)}
            >
              <img src={c.img} alt={c.title} className="cert-img" />
              <strong>{c.title}</strong>
              <span className="cert-meta">
                {c.org} • {c.date}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* MODAL PREVIEW */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            className="cert-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
          >
            <motion.img
              className="modal-img"
              src={selectedCert.img}
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
