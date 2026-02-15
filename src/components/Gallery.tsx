import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GalleryVerticalEnd } from "lucide-react";

interface GalleryProps {
  theme: "light" | "dark";          // still here if you need it elsewhere
  onOpenGalleryPage: () => void;
}

export function Gallery({ theme, onOpenGalleryPage }: GalleryProps) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20% 0px" });
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 250);
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--gallery-bg)",
        color: "var(--gallery-text)",
        position: "relative",
        overflow: "hidden",
        paddingTop: "40px",
        boxSizing: "border-box",
        fontFamily: "Poppins, sans-serif",
        transition: "background-color 0.35s ease, color 0.35s ease",
      }}
    >
      {/* ===== TITLE ===== */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={loaded && isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          textAlign: "center",
          fontSize: "64px",
          fontWeight: 400,
          letterSpacing: "2px",
          marginBottom: "30px",
        }}
      >
        My{" "}
        <span
          style={{
            background: "linear-gradient(90deg,#ffffff,#8e44fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Gallery
        </span>
      </motion.h1>

      {/* ===== HERO IMAGE + CONTENT ===== */}
      <div
        style={{
          width: "100%",
          height: "85vh",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* IMAGE ZOOM-IN ON LOAD */}
        <motion.img
          src="./img5.jpeg"
          alt="hero"
          initial={{ scale: 2, opacity: 0 }}
          animate={loaded && isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: "brightness(var(--gallery-img-brightness))",
            transition: "filter 0.35s ease",
          }}
        />

        {/* TEXT + BUTTON ENTRANCE */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={loaded && isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute",
            top: "50%",
            left: "10%",
            transform: "translateY(-50%)",
          }}
        >
          <h2
            style={{
              fontSize: "52px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <GalleryVerticalEnd size={52} />
            A Journey Captured in Frames
          </h2>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={loaded && isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.97 }}
            style={{
              marginTop: "30px",
              padding: "15px 40px",
              background: "var(--gallery-cta-bg)",
              color: "var(--gallery-cta-text)",
              fontSize: "20px",
              fontWeight: "600",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              transition: "0.25s ease",
            }}
            onClick={onOpenGalleryPage}
          >
            View My Gallery →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
