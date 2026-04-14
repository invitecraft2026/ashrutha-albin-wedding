import { useState, useEffect, useRef } from "react";
import FloralDivider from "./FloralDivider";
import FallingPetals from "./FallingPetals";

const ENGAGEMENT_DATE = new Date("2026-05-11T05:30:00Z");
const WEDDING_DATE = new Date("2026-05-14T05:30:00Z");

const getRemaining = (target: Date) => {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0 };
  return {
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff % 86400000) / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
    s: Math.floor((diff % 60000) / 1000),
  };
};

const TimeUnit = ({
  value,
  label,
  accent,
}: {
  value: number;
  label: string;
  accent: string;
}) => (
  <div className="flex flex-col items-center gap-1.5">
    <div
      className="relative w-14 h-16 sm:w-18 sm:h-20 md:w-24 md:h-28 rounded-2xl flex items-center justify-center"
      style={{
        background: "rgba(255,255,255,0.25)",
        backdropFilter: "blur(12px)",
        border: `1px solid ${accent}40`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.06), inset 0 1px 0 rgba(255,255,255,0.6)`,
      }}
    >
      {/* Top shine */}
      <div
        className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl"
        style={{ background: "rgba(255,255,255,0.15)" }}
      />
      <span
        className="relative font-display font-bold text-2xl sm:text-3xl md:text-5xl tabular-nums"
        style={{ color: accent }}
      >
        {String(value).padStart(2, "0")}
      </span>
    </div>
    <span
      className="font-body text-[10px] sm:text-xs uppercase tracking-[0.2em]"
      style={{ color: `${accent}99` }}
    >
      {label}
    </span>
  </div>
);

const CountdownCard = ({
  icon,
  title,
  date,
  time,
  accent,
  bg,
  visible,
  delay,
  flip,
}: {
  icon: string;
  title: string;
  date: string;
  time: { d: number; h: number; m: number; s: number };
  accent: string;
  bg: string;
  visible: boolean;
  delay: number;
  flip?: boolean;
}) => (
  <div
    className="relative rounded-3xl overflow-hidden"
    style={{
      opacity: visible ? 1 : 0,
      transform: visible
        ? "translateY(0) scale(1)"
        : `translateY(50px) scale(0.97)`,
      transition: `opacity 1s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 1s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      background: bg,
      boxShadow: "0 20px 60px rgba(74,103,65,0.12), 0 4px 16px rgba(0,0,0,0.06)",
    }}
  >
    {/* Decorative corner circles */}
    <div
      className="absolute -top-8 -right-8 w-32 h-32 rounded-full opacity-20"
      style={{ background: accent }}
    />
    <div
      className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full opacity-10"
      style={{ background: accent }}
    />

    <div
      className={`relative z-10 p-6 sm:p-8 md:p-10 flex flex-col ${
        flip ? "md:flex-row-reverse" : "md:flex-row"
      } items-center gap-6 md:gap-10`}
    >
      {/* Left / Right info block */}
      <div
        className={`flex flex-col items-center md:items-start text-center md:text-left shrink-0 ${
          flip ? "md:items-end md:text-right" : ""
        }`}
      >
        <span className="text-4xl mb-3">{icon}</span>
        <h3
          className="font-display italic text-2xl sm:text-3xl md:text-4xl mb-1"
          style={{ color: accent }}
        >
          {title}
        </h3>
        <div
          className="w-10 h-px my-3"
          style={{ background: `${accent}60` }}
        />
        <p
          className="font-body text-xs sm:text-sm tracking-widest uppercase"
          style={{ color: `${accent}80` }}
        >
          {date}
        </p>
      </div>

      {/* Thin vertical divider on md+ */}
      <div
        className="hidden md:block w-px self-stretch opacity-20"
        style={{ background: accent }}
      />

      {/* Timer units */}
      <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center flex-1">
        <TimeUnit value={time.d} label="Days" accent={accent} />
        <TimeUnit value={time.h} label="Hours" accent={accent} />
        <TimeUnit value={time.m} label="Mins" accent={accent} />
        <TimeUnit value={time.s} label="Secs" accent={accent} />
      </div>
    </div>
  </div>
);

const Countdown = () => {
  const [engagementTime, setEngagementTime] = useState(getRemaining(ENGAGEMENT_DATE));
  const [weddingTime, setWeddingTime] = useState(getRemaining(WEDDING_DATE));
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setEngagementTime(getRemaining(ENGAGEMENT_DATE));
      setWeddingTime(getRemaining(WEDDING_DATE));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top, #eef5e6 0%, #dfead2 40%, #c5d8a4 100%)",
      }}
    >
      <FallingPetals count={12} />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section heading */}
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.9s cubic-bezier(0.22,1,0.36,1) 0s",
          }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-sage/60 mb-3">
            mark your calendar
          </p>
          <h2 className="font-display italic text-3xl md:text-4xl text-sage">
            Our Special Days
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-12 bg-gold/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <div className="h-px w-12 bg-gold/40" />
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {/* Engagement card — info LEFT, timer RIGHT */}
          <CountdownCard
            icon="💍"
            title="Engagement"
            date="May 11, 2026 • 11:00 AM"
            time={engagementTime}
            accent="#4a6741"
            bg="linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(232,240,216,0.9) 100%)"
            visible={visible}
            delay={0.2}
            flip={false}
          />

          {/* Wedding card — info RIGHT, timer LEFT (flipped) */}
          <CountdownCard
            icon="💒"
            title="Wedding"
            date="May 14, 2026 • 11:00 AM"
            time={weddingTime}
            accent="#6B8F4E"
            bg="linear-gradient(135deg, rgba(197,216,164,0.6) 0%, rgba(255,255,255,0.9) 100%)"
            visible={visible}
            delay={0.4}
            flip={true}
          />
        </div>

        {/* Bottom divider */}
        <div
          className="mt-14"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease 0.7s",
          }}
        >
          <FloralDivider />
        </div>
      </div>
    </section>
  );
};

export default Countdown;