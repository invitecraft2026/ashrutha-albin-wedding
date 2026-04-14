import { useEffect, useRef, useState } from "react";
import FloralDivider from "./FloralDivider";

// 📍 Engagement Location
const ENGAGEMENT_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=St+Thomas+Orthodox+Church+Umayattukara";
const ENGAGEMENT_MAP =
  "https://maps.google.com/?q=St+Thomas+Orthodox+Church+Umayattukara";

// 💍 Wedding Location
const WEDDING_DIRECTIONS =
  "https://www.google.com/maps/dir/?api=1&destination=Ebenezer+Marthoma+Church+Othera";
const WEDDING_MAP =
  "https://maps.google.com/?q=Ebenezer+Marthoma+Church+Othera";

const Venue = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const slideStyle = (delay: number): React.CSSProperties => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
  });

  return (
    <section
      ref={sectionRef}
      className="py-24 px-6 bg-ivory relative overflow-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.04]">
        {Array.from({ length: 6 }).map((_, i) => (
          <svg
            key={i}
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="absolute"
            style={{
              left: `${(i % 3) * 35}%`,
              top: `${Math.floor(i / 3) * 50}%`,
              transform: `rotate(${i * 60}deg)`,
            }}
          >
            <path
              d="M100 20 Q130 60 100 180 Q70 60 100 20Z"
              fill="currentColor"
            />
          </svg>
        ))}
      </div>

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <div style={slideStyle(0.1)}>
          <FloralDivider className="mb-10" />
        </div>

        {/* ================= ENGAGEMENT ================= */}
        <div
          className="p-8 md:p-10 rounded-2xl border-2 border-gold/40 bg-cream/30 backdrop-blur-sm shadow-xl mb-10"
          style={slideStyle(0.3)}
        >
          <p className="text-xs tracking-widest text-sage/70 uppercase mb-2">
            Engagement Venue
          </p>

          <h2 className="font-subheading text-xl md:text-2xl text-sage mb-2">
            St. Thomas Orthodox Church
          </h2>

          <p className="font-body text-sage/70 mb-4">
            Umayattukara Parish Hall
          </p>

          <FloralDivider className="my-4" />

          <p className="font-display italic text-lg text-sage">
            May 11, 2026 | 11:00 AM
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-center mt-5">
            <button
              onClick={() => window.open(ENGAGEMENT_DIRECTIONS, "_blank")}
              className="px-4 py-2 rounded-full bg-sage text-cream text-sm"
            >
              📍 Directions
            </button>
            <button
              onClick={() => window.open(ENGAGEMENT_MAP, "_blank")}
              className="px-4 py-2 rounded-full border border-gold text-sage text-sm"
            >
              🗺️ Map
            </button>
          </div>
        </div>

        {/* ================= WEDDING ================= */}
        <div
          className="p-8 md:p-10 rounded-2xl border-2 border-gold/40 bg-cream/30 backdrop-blur-sm shadow-xl"
          style={slideStyle(0.5)}
        >
          <p className="text-xs tracking-widest text-sage/70 uppercase mb-2">
            Wedding Venue
          </p>

          <h2 className="font-subheading text-xl md:text-2xl text-sage mb-2">
            Ebenezer Marthoma Church
          </h2>

          <p className="font-body text-sage/70 mb-4">Othera</p>

          <FloralDivider className="my-4" />

          <p className="font-display italic text-lg text-sage">
            May 14, 2026
          </p>

          {/* Buttons */}
          <div className="flex gap-3 justify-center mt-5">
            <button
              onClick={() => window.open(WEDDING_DIRECTIONS, "_blank")}
              className="px-4 py-2 rounded-full bg-sage text-cream text-sm"
            >
              📍 Directions
            </button>
            <button
              onClick={() => window.open(WEDDING_MAP, "_blank")}
              className="px-4 py-2 rounded-full border border-gold text-sage text-sm"
            >
              🗺️ Map
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Venue;