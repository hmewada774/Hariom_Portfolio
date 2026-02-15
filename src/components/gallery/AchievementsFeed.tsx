import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function AchievementsFeed() {
  const achievements = [
    {
      title: "🏆 30+ Labs  Solved",
      img: "/gallery/Achievements/thm.png",
    },
    // {
    //   title: "🤵🏻 Technical Lead at AI Club SCET",
    //   img: "/gallery/Achievements/techlead.png",
    // },
    // {
    //   title: "Qualified for TCS CodeVita Seasone 13 2025",
    //   img: "./TCS.jpg",
    // },
  ];

  return (
    <section className="g-projects-feed">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="g-title"
      >
        My <span className="grad">Achievements</span>
      </motion.h2>

      {achievements.map((ach, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.25, duration: 0.7, ease: "easeOut" }}
        >
          <AchievementCard ach={ach} />
        </motion.div>
      ))}
    </section>
  );
}

/* ─────────────────────────────── CARD ─────────────────────────────── */

function AchievementCard({ ach }) {
  const [open, setOpen] = useState(false);

  const fade = {
    initial: { opacity: 0, scale: 0.92 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.92 },
    transition: { duration: 0.35, ease: "easeOut" },
  };

  return (
    <>
      <div className="g-project-card" onClick={() => setOpen(true)}>
        <div className="g-carousel">
          <motion.img
            src={ach.img}
            alt={ach.title}
            className="g-cimg"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          />
        </div>

        <h3 className="g-project-title">{ach.title}</h3>
      </div>

      {/* ───── FULLSCREEN MODAL ───── */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="g-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              className="g-modal-content"
              variants={fade}
              initial="initial"
              animate="animate"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={ach.img} className="g-modal-img" alt={ach.title} />

              <button className="g-close-modal" onClick={() => setOpen(false)}>
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
