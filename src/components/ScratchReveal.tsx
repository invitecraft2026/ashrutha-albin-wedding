import { useRef, useState, useEffect, useCallback } from "react";
import confetti from "canvas-confetti";
import FloralDivider from "./FloralDivider";

// 📅 Engagement Calendar
const ENGAGEMENT_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Neethu+%26+Allan+Engagement&dates=20260511T053000Z/20260511T083000Z&details=Join+us+for+the+engagement+ceremony&location=St+Thomas+Orthodox+Church,+Umayattukara";

// 💍 Wedding Calendar
const WEDDING_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Neethu+%26+Allan+Wedding&dates=20260514T053000Z/20260514T083000Z&details=Join+us+for+the+wedding+ceremony&location=St+Thomas+Orthodox+Church,+Umayattukara";

const ScratchReveal = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  // 🎯 Get cursor/touch position
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

  // ✨ Scratch effect
  const scratch = (x: number, y: number) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 28, 0, Math.PI * 2);
    ctx.fill();
  };

  // 🌼 Jasmine animation
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

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  // 🔍 Check reveal percentage
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
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [revealed]);

  // 🎨 Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = 400;
    canvas.height = 200;

    // Base layer
    ctx.fillStyle = "#b8c99a";
    ctx.fillRect(0, 0, 400, 200);

    // Pattern
    ctx.strokeStyle = "#C9A84C";
    ctx.lineWidth = 0.5;
    ctx.globalAlpha = 0.3;

    for (let i = 0; i < 400; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i + 100, 200);
      ctx.stroke();
    }

    ctx.globalAlpha = 1;

    // Hint text
    ctx.fillStyle = "#6B8F4E";
    ctx.font = "18px 'Playfair Display', serif";
    ctx.textAlign = "center";
    ctx.fillText("✦ Scratch to Reveal ✦", 200, 108);
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
    <section className="py-24 px-6 bg-cream">
      <div className="max-w-lg mx-auto text-center">
        <FloralDivider className="mb-8" />

        <h2 className="font-subheading text-2xl md:text-3xl text-sage mb-8 tracking-wider">
          Reveal the Dates
        </h2>

        <div
          className="relative mx-auto rounded-2xl border-2 border-gold/50 overflow-hidden shadow-xl bg-ivory"
          style={{ maxWidth: 400, aspectRatio: "2/1" }}
        >
          {/* 🎉 Revealed Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            
            {/* Engagement */}
            <p className="text-xs tracking-widest text-sage/70 uppercase mb-1">
              Engagement
            </p>
            <p className="font-display italic text-2xl md:text-3xl text-sage">
              May 11, 2026
            </p>
            <p className="font-body text-sage/70 text-sm mb-3">
              11:00 AM IST
            </p>

            <div className="w-10 h-[1px] bg-gold/60 my-2" />

            {/* Wedding */}
            <p className="text-xs tracking-widest text-sage/70 uppercase mb-1">
              Wedding
            </p>
            <p className="font-display italic text-2xl md:text-3xl text-sage">
              May 14, 2026
            </p>

          </div>

          {/* Scratch Layer */}
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

        {/* 📅 Calendar Buttons */}
        {revealed && (
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center animate-fade-up">
            
            <button
              onClick={() => window.open(ENGAGEMENT_CALENDAR_URL, "_blank")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-sage text-cream font-subheading tracking-wider border-2 border-gold/50 hover:bg-sage/90 transition-colors shadow-lg"
            >
              📅 Engagement
            </button>

            <button
              onClick={() => window.open(WEDDING_CALENDAR_URL, "_blank")}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gold text-sage font-subheading tracking-wider border-2 border-sage/50 hover:opacity-90 transition-colors shadow-lg"
            >
              💍 Wedding
            </button>

          </div>
        )}
      </div>
    </section>
  );
};

export default ScratchReveal;