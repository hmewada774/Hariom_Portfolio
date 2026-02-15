import { useEffect, useState } from "react";

const images = import.meta.glob("/src/assets/Personal/*.{jpg,jpeg,png,gif}", {
  eager: true,
});

export function PersonalGrid() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // delay for smooth section-switch animation
    setTimeout(() => setLoaded(true), 80);
  }, []);

  return (
    <div className={`masonry-wrapper ${loaded ? "show" : ""}`}>
      <div className="masonry">
        {Object.values(images).map((img: any, index) => (
          <div key={index} className="masonry-item">
            <img src={img.default} alt="personal" />
          </div>
        ))}
      </div>
    </div>
  );
}
