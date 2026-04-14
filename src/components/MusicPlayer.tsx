import { useState, useRef, forwardRef, useImperativeHandle, useEffect } from "react";

export interface MusicPlayerHandle {
  play: () => void;
}

const MusicPlayer = forwardRef<MusicPlayerHandle>((_, ref) => {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  // 🔥 Smooth scroll tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔊 Set initial volume + fade-in effect
  useEffect(() => {
    if (!audioRef.current) return;

    audioRef.current.volume = 0.25; // start from 0

    let vol = 0;
    const fade = setInterval(() => {
      if (audioRef.current && vol < 0.3) {
        vol += 0.02;
        audioRef.current.volume = vol;
      } else {
        clearInterval(fade);
      }
    }, 100);

    return () => clearInterval(fade);
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (audioRef.current) {
        audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
      }
    },
  }));

  const toggle = () => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch((err) => console.log("Audio blocked:", err));
    }
  };

  // 🔥 Floating animation
  const floatY = Math.sin(scrollY * 0.006) * 20;
  const floatX = Math.cos(scrollY * 0.004) * 8;

  return (
    <>
      {/* 🎵 Add your music file here */}
      <audio ref={audioRef} loop preload="auto" src="/i found you.mpeg" />

      <div
        className="fixed z-[9999] flex items-center"
        style={{
          right: `${24 + floatX}px`,
          bottom: `${90 + floatY}px`,
          transition: "right 0.2s ease-out, bottom 0.2s ease-out",
        }}
      >
        {/* Tooltip */}
        <div
          className="mr-3 px-3 py-1 rounded-full text-xs whitespace-nowrap relative"
          style={{
            background: "hsl(var(--sage))",
            color: "hsl(var(--cream))",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateX(0)" : "translateX(8px)",
            transition: "opacity 0.2s, transform 0.2s",
            pointerEvents: "none",
          }}
        >
          {playing ? "Pause Music" : "Play Music"}
          <span
            className="absolute top-1/2 -right-1.5"
            style={{
              transform: "translateY(-50%)",
              width: 0,
              height: 0,
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderLeft: "6px solid hsl(var(--sage))",
            }}
          />
        </div>

        {/* Button */}
        <button
          onClick={toggle}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-[52px] h-[52px] rounded-full flex items-center justify-center border-2 cursor-pointer hover:scale-105 shrink-0"
          style={{
            background: "hsl(var(--pistachio))",
            borderColor: "hsl(var(--gold))",
            transition: "transform 0.3s, box-shadow 0.3s",
            boxShadow: playing
              ? "0 0 20px rgba(201,168,76,0.7)"
              : "0 4px 20px rgba(107,143,78,0.4)",
          }}
        >
          {playing ? (
            <div className="flex items-end gap-[3px] h-5">
              {[0, 0.15, 0.3, 0.45].map((delay, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-sm"
                  style={{
                    background: "hsl(var(--sage))",
                    animation: `eq 0.8s ease-in-out ${delay}s infinite`,
                    height: "4px",
                  }}
                />
              ))}
            </div>
          ) : (
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="hsl(var(--sage))"
            >
              <path d="M9 18V5l12-2v13M9 18c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3zM21 16c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3 3 1.34 3 3z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
});

MusicPlayer.displayName = "MusicPlayer";
export default MusicPlayer;