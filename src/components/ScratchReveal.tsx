import { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import FloralDivider from "./FloralDivider";

const WEDDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Albin+%26+Ashrutha+Wedding&dates=20260518T034500Z/20260518T043500Z&details=Join+us+for+the+wedding+ceremony&location=Holiday+Home,+Kumily";

const ScratchReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    return {
      x: ((clientX - rect.left) / rect.width) * canvas.width,
      y: ((clientY - rect.top) / rect.height) * canvas.height,
    };
  };

  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
  };

  const startFlowerAnimation = () => {
    const duration = 3000;
    const end = Date.now() + duration;
    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 90,
        spread: 60,
        origin: { x: Math.random(), y: -0.1 },
        shapes: ["text"],
        scalar: 1.2,
        ticks: 200,
        gravity: 0.4,
        colors: ["#ffffff"],
        text: ["🌼"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  };

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || revealed) return;
    const ctx = canvas.getContext("2d")!;
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let transparent = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] === 0) transparent++;
    }
    if (transparent / (data.length / 4) > 0.55) {
      setRevealed(true);
      startFlowerAnimation();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#D4A24C", "#8B1A1A", "#F2C97A", "#C8392B", "#F2C4A0"],
      });
    }
  }, [revealed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    canvas.width = 400;
    canvas.height = 200;

    // Base fill — deep crimson
    ctx.fillStyle = "#8B1A1A";
    ctx.fillRect(0, 0, 400, 200);

    // Diagonal gold pattern overlay
    ctx.strokeStyle = "#D4A24C";
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = 0.25;
    for (let i = -200; i < 600; i += 22) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 200, 200);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Subtle gold top shimmer band
    const shimmer = ctx.createLinearGradient(0, 0, 400, 0);
    shimmer.addColorStop(0, "rgba(212,162,76,0)");
    shimmer.addColorStop(0.5, "rgba(242,201,122,0.18)");
    shimmer.addColorStop(1, "rgba(212,162,76,0)");
    ctx.fillStyle = shimmer;
    ctx.fillRect(0, 0, 400, 80);

    // Hint text — ivory on crimson
    ctx.fillStyle = "#F5E6C8";
    ctx.font = "bold 16px 'Cormorant Garamond', Georgia, serif";
    ctx.textAlign = "center";
    ctx.fillText("✦  Scratch to Reveal  ✦", 200, 98);

    // Sub-hint
    ctx.fillStyle = "rgba(245,230,200,0.55)";
    ctx.font = "12px 'Inter', sans-serif";
    ctx.fillText("slide your finger across", 200, 122);
  }, []);

  const onStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawing.current = true;
    const { x, y } = getPos(e);
    scratch(x, y);
  };
  const onMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const { x, y } = getPos(e);
    scratch(x, y);
  };
  const onEnd = () => {
    isDrawing.current = false;
    checkReveal();
  };

  return (
    <section
      className="py-24 px-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at top, #FBF5EC 0%, #F5E6C8 50%, #F2C4A0 100%)",
      }}
    >
      {/* Crimson vignette bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(to top, rgba(139,26,26,0.07) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <FloralDivider className="mb-8" />

        {/* Eyebrow */}
        <p
          className="font-sans text-xs tracking-[0.35em] uppercase mb-2"
          style={{ color: "#A0742A" }}
        >
          a little surprise
        </p>

        {/* Heading — crimson serif */}
        <h2
          className="font-serif italic text-2xl md:text-3xl mb-2 tracking-wide"
          style={{ color: "#8B1A1A" }}
        >
          Reveal the Date
        </h2>

        {/* Gold ornamental divider */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px w-12" style={{ background: "linear-gradient(to right, transparent, #D4A24C)" }} />
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
            <path d="M7 1 L7.9 5.5 L12.5 7 L7.9 8.5 L7 13 L6.1 8.5 L1.5 7 L6.1 5.5 Z" fill="#D4A24C" />
          </svg>
          <div className="h-px w-12" style={{ background: "linear-gradient(to left, transparent, #D4A24C)" }} />
        </div>

        {/* Scratch card container */}
        <div
          className="relative mx-auto rounded-2xl overflow-hidden"
          style={{
            maxWidth: 400,
            aspectRatio: "2/1",
            border: "1px solid rgba(212,162,76,0.40)",
            boxShadow:
              "0 20px 60px rgba(139,26,26,0.14), 0 4px 16px rgba(160,116,42,0.10), inset 0 1px 0 rgba(255,255,255,0.6)",
            background: "#FBF5EC",
          }}
        >
          {/* Gold top-edge shimmer line */}
          <div
            className="absolute top-0 left-6 right-6 h-px z-10 pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, #D4A24C90, transparent)",
            }}
          />

          {/* Revealed content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            {/* Diya flame icon */}
            <span className="text-2xl mb-1">🪔</span>
            <p
              className="font-sans text-[10px] tracking-[0.3em] uppercase mb-1"
              style={{ color: "#A0742A" }}
            >
              Wedding
            </p>
            <p
              className="font-serif italic text-2xl md:text-3xl"
              style={{ color: "#8B1A1A" }}
            >
              May 18, 2026
            </p>
            {/* Gold micro-divider */}
            <div className="flex items-center gap-2 my-2">
              <div className="w-4 h-px" style={{ background: "#D4A24C60" }} />
              <div className="w-1 h-1 rounded-full" style={{ background: "#D4A24C" }} />
              <div className="w-4 h-px" style={{ background: "#D4A24C60" }} />
            </div>
            <p
              className="font-sans text-sm"
              style={{ color: "#A0742A" }}
            >
              9:15 AM – 10:05 AM IST
            </p>
          </div>

          {/* Scratch layer */}
          {!revealed && (
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full cursor-pointer touch-none"
              onMouseDown={onStart}
              onMouseMove={onMove}
              onMouseUp={onEnd}
              onMouseLeave={onEnd}
              onTouchStart={onStart}
              onTouchMove={onMove}
              onTouchEnd={onEnd}
            />
          )}
        </div>

        {/* Hint text below card */}
        {!revealed && (
          <p
            className="mt-3 font-sans text-xs tracking-widest uppercase"
            style={{ color: "rgba(139,26,26,0.45)" }}
          >
            scratch the card above
          </p>
        )}

        {/* Calendar button — revealed state */}
        {revealed && (
          <div
            className="mt-8 flex justify-center"
            style={{ animation: "fadeIn 0.6s ease forwards" }}
          >
            <button
              onClick={() => window.open(WEDDING_CALENDAR_URL, "_blank")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full font-sans text-sm tracking-widest uppercase transition-all hover:scale-105 active:scale-95"
              style={{
                background: "#8B1A1A",
                color: "#F5E6C8",
                border: "1px solid rgba(212,162,76,0.50)",
                boxShadow:
                  "0 8px 24px rgba(139,26,26,0.25), inset 0 1px 0 rgba(242,201,122,0.20)",
                letterSpacing: "0.15em",
              }}
            >
              <span style={{ color: "#D4A24C" }}>💍</span>
              Add to Calendar
            </button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default ScratchReveal;