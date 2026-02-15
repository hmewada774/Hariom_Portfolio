import { useState, useEffect } from "react";
import IntroVideo from "./components/IntroVideo";
import { Navbar } from "./components/Navbar";
import { FloatingNav } from "./components/FloatingNav";
import { Home } from "./components/Home";
import { About } from "./components/About";

import Projects from "./components/Projects";
import { Gallery } from "./components/Gallery";
import { GalleryPage } from "./components/GalleryPage"; // <--- NEW PAGE IMPORT
import { Skills } from "./components/Skills";
import Certificates from "./components/Certificates";
import { Resume } from "./components/Resume";
import { Blog } from "./components/Blog";
import { Contact } from "./components/Contact";
import { ThemeToggle } from "./components/ThemeToggle";

export default function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [introDone, setIntroDone] = useState(false);
  const [openGalleryPage, setOpenGalleryPage] = useState(false); // <--- NEW STATE

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="bg-white dark:bg-black min-h-screen relative overflow-x-hidden transition-colors duration-300">

      {/* Navbar always visible */}
      {!openGalleryPage && (
        <>
          <Navbar />
          <FloatingNav />
        </>
      )}
      <ThemeToggle theme={theme} setTheme={setTheme} />

      <main>
        {/* Show intro video first */}
        {!introDone && <IntroVideo onFinish={() => setIntroDone(true)} />}

        {/* AFTER INTRO */}
        {introDone && (
          <>
            {/* IF GALLERY PAGE IS OPEN — SHOW ONLY THAT */}
            {openGalleryPage ? (
              <GalleryPage onBack={() => setOpenGalleryPage(false)} />
            ) : (
              <>
                {/* OTHERWISE SHOW MAIN WEBSITE */}
                <Home theme={theme} />

                <About />

                <Projects theme={theme} />

                {/* PASS FUNCTION TO GALLERY BUTTON */}
                <Gallery theme={theme} onOpenGalleryPage={() => setOpenGalleryPage(true)} />


                <Skills theme={theme} />
                <Resume theme={theme} />
                <Certificates theme={theme} />
                <Blog theme={theme} />
                <Contact theme={theme} />
              </>
            )}
          </>
        )}
      </main>

      {/* Footer only when NOT in GalleryPage */}
      {!openGalleryPage && (
        <footer className="relative border-t border-gray-200 dark:border-white/10 py-8">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-gray-600 dark:text-white/60">
              © 2025 Hariom Mewada.
            </p>
          </div>
        </footer>
      )}
    </div>
  );
}
