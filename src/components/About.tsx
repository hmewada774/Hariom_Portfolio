import { useEffect, useRef, useState } from "react";
import {
  Code,
  Timer,
  Cpu,
  Trophy,
  Gamepad2,
} from "lucide-react";

import "./About.css";

export function About() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [titleVisible, setTitleVisible] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);
  const [extraVisible, setExtraVisible] = useState(false);
  const [hobbiesVisible, setHobbiesVisible] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const extraRef = useRef<HTMLDivElement>(null);

  /* ===== TITLE REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setTitleVisible(true),
      { threshold: 0.5 }
    );
    const intro = document.querySelector(".about-intro-screen");
    if (intro) observer.observe(intro);
    return () => observer.disconnect();
  }, []);

  /* ===== IMAGE SCROLL ===== */
  useEffect(() => {
    const NAVBAR_HEIGHT = 80;
    const IMAGE_STOP_OFFSET = 60;

    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const scrolled = Math.max(0, NAVBAR_HEIGHT + IMAGE_STOP_OFFSET - rect.top);
      const progress = Math.min(scrolled / (window.innerHeight * 0.25), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* ===== WHO AM I REVEAL (whole box + then typing) ===== */
  useEffect(() => {
    let triggered = false;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;

          // after 4s: show WHO AM I card (whole box)
          setTimeout(() => {
            setInfoVisible(true);

            // after card is visible: start typing on title
            setTimeout(() => {
              const el = document.querySelector(".whoami-title");
              el?.classList.add("type");
            }, 200);
          }, 1000); // 4 seconds AFTER scrolled into view
        }
      },
      { threshold: 0.7 }
    );

    if (infoRef.current) observer.observe(infoRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== EXTRA REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setExtraVisible(true),
      { threshold: 0.3 }
    );
    if (extraRef.current) observer.observe(extraRef.current);
    return () => observer.disconnect();
  }, []);

  /* ===== HOBBIES REVEAL ===== */
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setHobbiesVisible(true),
      { threshold: 0.3 }
    );
    const hobbiesElement = document.querySelector(".about-hobbies");
    if (hobbiesElement) observer.observe(hobbiesElement);
    return () => observer.disconnect();
  }, []);

  /* ===== COUNTERS ===== */
  const counters = [
    { icon: Code, label: "Projects Completed", value: 5 },
    { icon: Timer, label: "Years Experience in Cyber Security", value: 2 },
    { icon: Cpu, label: "Technologies Mastered", value: 10 },
    { icon: Trophy, label: "CTF Solved", value: 50 },
  ];

  const [countValues, setCountValues] = useState(counters.map(() => 0));

  useEffect(() => {
    if (!extraVisible) return;

    counters.forEach((counter, index) => {
      let start = 0;
      const end = counter.value;
      const interval = setInterval(() => {
        start++;
        setCountValues((prev) => {
          const updated = [...prev];
          updated[index] = start;
          return updated;
        });
        if (start === end) clearInterval(interval);
      }, 1500 / counter.value);
    });
  }, [extraVisible]);

  /* ===== IMAGE + TEXT ===== */
  const getImageWidth = () =>
    scrollProgress < 0.2 ? 100 :
      scrollProgress < 0.6 ? 100 - ((scrollProgress - 0.4) / 0.2) * 50 :
        50;

  const NAVBAR_HEIGHT = 80;

  const getImageTransform = () =>
    scrollProgress < 0.2
      ? `translateY(${100 - (scrollProgress / 0.2) * 100 + NAVBAR_HEIGHT}px)`
      : `translateY(${NAVBAR_HEIGHT}px)`;

  const getTextOpacity = () =>
    scrollProgress < 0.4 ? 0 :
      scrollProgress < 0.6 ? (scrollProgress - 0.4) / 0.2 :
        1;

  return (
    <section id="about" className="about-wrapper">
      {/* INTRO TITLE */}
      <div className={`about-intro-screen ${titleVisible ? "show-title" : ""}`}>
        <h1>
          About <span className="grad">me?</span>
        </h1>
      </div>

      {/* MAIN SCROLL AREA */}
      <div ref={containerRef} className="about-scroll">
        <div className="about-sticky">
          {/* IMAGE */}
          <div
            className="about-image"
            style={{ width: `${getImageWidth()}%`, transform: getImageTransform() }}
          >
            <img src="./temp1.png" alt="Profile" />
          </div>

          {/* INFO PANEL */}
          <div
            ref={infoRef}
            className={`about-info ${infoVisible ? "info-show" : ""}`}
            style={{
              // WHOLE BOX HIDDEN UNTIL infoVisible === true
              opacity: infoVisible ? getTextOpacity() : 0,
              width: infoVisible
                ? getImageWidth() > 60
                  ? "0%"
                  : "50%"
                : "0%"
            }}
          >
            <div className="info-inner">
              <h2 className="whoami-title">
                <span>Who am I?</span>
              </h2>

              <p>
                I am a Cyber Security enthusiast and Full Stack Web Developer with hands-on
                experience in C/C++, Java, Python, and Linux-based systems.

              </p>

              <p>
                My core interests include Network Security, Ethical Hacking, IoT Security,
                and Bluetooth Security. I enjoy building secure applications and researching
                real-world security challenges.
              </p>

              <p>
                I have experience using Git & GitHub for version control and collaborative
                development and I actively work on security-focused and web-based projects.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* EXTRA SECTION */}
      <div ref={extraRef} className={`about-extra ${extraVisible ? "extra-show" : ""}`}>
        <div className="about-counters">
          {counters.map((c, i) => (
            <div key={i} className="counter-box">
              <c.icon size={42} className="counter-icon" />
              <h3>{countValues[i]}+</h3>
              <p>{c.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* HOBBIES SECTION */}
      <div className={`about-hobbies ${hobbiesVisible ? "hobbies-show" : "hobbies-hidden"}`}>
        <h2>Hobbies</h2>
        <div className="hobby-grid">
          <div className="hobby">Listening to Music</div>
          <div className="hobby">CTF Solving</div>
          <div className="hobby">Traveling</div>
          <div className="hobby">Exploring New Tech</div>
        </div>
      </div>
    </section>
  );
}
