import { useEffect, useState } from "react";
import { ArrowLeft, User, Briefcase, Trophy } from "lucide-react";
import "./GalleryPage.css";

import { PersonalGrid } from "./gallery/PersonalGrid";
import { ProjectsFeed } from "./gallery/ProjectsFeed";
import { AchievementsFeed } from "./gallery/AchievementsFeed";

interface GalleryPageProps {
  theme: "light" | "dark";
  onBack: () => void; // parent callback
}

export function GalleryPage({ theme, onBack }: GalleryPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("personal");

  /* FIXED useEffect */
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(timer); // proper cleanup
  }, []);

  const categories = [
    { key: "personal", name: "Personal Life", icon: User },
    { key: "projects", name: "Projects & Work", icon: Briefcase },
    { key: "achievements", name: "Achievements", icon: Trophy },
  ];

  return (
    <div className="gallery-container">
      {/* NAVBAR */}
      <nav className="gallery-navbar">
        <h2
          className="gallery-title"
          style={{
            opacity: loaded ? 1 : 0,
            transform: loaded ? "translateY(0)" : "translateY(-20px)",
          }}
        >
          My <span style={{ opacity: 1 }}>Collections</span>
        </h2>

        <div className="gallery-links">
          {categories.map((c) => (
            <p
              key={c.key}
              className={activeCategory === c.key ? "active-link" : ""}
              onClick={() => setActiveCategory(c.key)}
            >
              <c.icon size={18} style={{ marginRight: "6px" }} />
              {c.name}
            </p>
          ))}
        </div>

        {/* FIXED BACK BUTTON */}
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={18} /> Back To Portfolio
        </button>
      </nav>

      {/* CATEGORY BODY */}
      <section className="category-section animate">
        {activeCategory === "personal" && <PersonalGrid />}
        {activeCategory === "projects" && <ProjectsFeed />}
        {activeCategory === "achievements" && <AchievementsFeed />}
      </section>
    </div>
  );
}
