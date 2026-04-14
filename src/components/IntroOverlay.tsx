import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import floralFrame from "/new-intro-image-1.png";

const PETAL_COUNT = 12;

const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 7 + Math.random() * 5,
  size: 10 + Math.random() * 14,
  rotation: Math.random() * 360,
}));

const FloatingPetals = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden z-10">
    {petals.map((p) => (
      <div
        key={p.id}
        className="absolute animate-petal-fall opacity-0"
        style={{
          left: `${p.left}%`,
          animationDelay: `${p.delay}s`,
          animationDuration: `${p.duration}s`,
          width: p.size,
          height: p.size,
        }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, #f5e6e8, #f0d6d9)",
            transform: `rotate(${p.rotation}deg) scaleX(0.6)`,
          }}
        />
      </div>
    ))}
  </div>
);

const GlowParticles = () => (
  <div className="pointer-events-none fixed inset-0 z-0">
    {Array.from({ length: 8 }, (_, i) => (
      <div
        key={i}
        className="absolute rounded-full animate-glow-pulse"
        style={{
          width: 4 + Math.random() * 6,
          height: 4 + Math.random() * 6,
          left: `${15 + Math.random() * 70}%`,
          top: `${15 + Math.random() * 70}%`,
          background:
            "radial-gradient(circle, rgba(212,162,76,0.5), transparent)",
          animationDelay: `${Math.random() * 3}s`,
        }}
      />
    ))}
  </div>
);

const IntroOverlay = ({ onEnter }: { onEnter: () => void }) => {
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = useCallback(() => {
    if (isExiting) return;

    setIsExiting(true);
    setTimeout(onEnter, 1200);
  }, [onEnter, isExiting]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer overflow-hidden"
          style={{
            background:
              "linear-gradient(180deg, #faf6f0 0%, #f6efe6 50%, #f3ebe0 100%)",
          }}
          onClick={handleEnter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        >
          <GlowParticles />
          <FloatingPetals />

          {/* 🌸 Center Content */}
          <div className="relative z-20 flex flex-col items-center">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5 }}
            >
              {/* Floral Frame */}
              <img
                src={floralFrame}
                alt="Floral Frame"
                className="w-[320px] sm:w-[420px] md:w-[480px] object-contain"
              />

              {/* Names */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-[#D4A24C] text-3xl sm:text-4xl md:text-5xl font-serif">
                  Ashrutha
                </h1>

                <p className="text-[#D4A24C] my-1">&</p>

                <h1 className="text-[#D4A24C] text-3xl sm:text-4xl md:text-5xl font-serif">
                  Albin
                </h1>
              </div>
            </motion.div>

            {/* Tap#E8941A */}
            <p className="mt-8 text-sm tracking-[0.3em] text-[#D4A24C] uppercase">
              Tap to Enter
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroOverlay;