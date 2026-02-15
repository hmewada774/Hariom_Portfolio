import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, Palette, Globe } from "lucide-react";
import "./IntroVideo.css";

export default function IntroVideo({ onFinish }: { onFinish?: () => void }) {
  const [hide, setHide] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    let current = 0;
    const interval = setInterval(() => {
      current += 1;
      setProgress(current);
    }, 25);

    const timer = setTimeout(() => {
      setHide(true);
      document.body.style.overflow = "auto";
      onFinish?.();
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  // icon state based on progress
  const icon =
    progress < 34 ? <Rocket /> :
      progress < 67 ? <Palette /> :
        <Globe />;

  return (
    !hide && (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 4.7, duration: 0.9 }}
        className="intro-video-wrapper"
      >
        <video autoPlay muted playsInline className="intro-video">
          <source src="/intro" type="video/mp4" />
        </video>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="intro-title"
        >
          Welcome to My World
        </motion.h1>

        <div className="intro-progress">
          <div className="progress-track">
            <motion.div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* ICON that changes */}
          <motion.div
            key={progress < 34 ? "rocket" : progress < 67 ? "palette" : "globe"}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="progress-icon"
          >
            {icon}
          </motion.div>

          <span className="progress-text">
            {progress < 34
              ? "Launching creativity..."
              : progress < 67
                ? "Designing possibilities..."
                : "Going global..."}
          </span>
        </div>
      </motion.div>
    )
  );
}
