const Footer = () => (
  <footer
    className="py-16 px-6 text-center relative overflow-hidden"
    style={{
      background: "linear-gradient(160deg, #5C1010 0%, #8B1A1A 45%, #6B1212 100%)",
    }}
  >
    {/* Gold shimmer top edge */}
    <div
      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
      style={{
        background:
          "linear-gradient(90deg, transparent 0%, #D4A24C 30%, #F2C97A 50%, #D4A24C 70%, transparent 100%)",
      }}
    />

    {/* Subtle diagonal gold pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.04] pointer-events-none"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #D4A24C 0px, #D4A24C 1px, transparent 1px, transparent 28px)",
      }}
    />

    {/* Ivory vignette corners */}
    <div
      className="absolute top-0 left-0 w-48 h-48 rounded-full pointer-events-none opacity-5"
      style={{ background: "#F5E6C8", transform: "translate(-50%, -50%)" }}
    />
    <div
      className="absolute bottom-0 right-0 w-48 h-48 rounded-full pointer-events-none opacity-5"
      style={{ background: "#F5E6C8", transform: "translate(50%, 50%)" }}
    />

    <div className="relative z-10">
      {/* Floral wreath SVG */}
      <div className="mb-8">
        <svg width="130" height="130" viewBox="0 0 120 120" className="mx-auto">
          {/* Outer ring — gold */}
          <circle
            cx="60" cy="60" r="50"
            fill="none"
            stroke="#D4A24C"
            strokeWidth="0.6"
            opacity="0.35"
          />
          {/* Inner ring — ivory */}
          <circle
            cx="60" cy="60" r="44"
            fill="none"
            stroke="#F5E6C8"
            strokeWidth="0.5"
            opacity="0.20"
          />

          {/* Mango-leaf petals — gold */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
            <ellipse
              key={angle}
              cx="60"
              cy="12"
              rx="4"
              ry="10"
              fill="#D4A24C"
              opacity="0.55"
              transform={`rotate(${angle} 60 60)`}
            />
          ))}

          {/* Small dot accents between petals */}
          {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            const r = 44;
            return (
              <circle
                key={angle}
                cx={60 + r * Math.sin(rad)}
                cy={60 - r * Math.cos(rad)}
                r="1.5"
                fill="#F2C97A"
                opacity="0.5"
              />
            );
          })}

          {/* Monogram N */}
          <text
            x="60" y="55"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="22"
            fontStyle="italic"
            fill="#F2C97A"
          >
            A
          </text>

          {/* Heart */}
          <text
            x="60" y="67"
            textAnchor="middle"
            fontSize="10"
            fill="#F5E6C8"
            opacity="0.75"
          >
            ♡
          </text>

          {/* Monogram A */}
          <text
            x="60" y="81"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', Georgia, serif"
            fontSize="22"
            fontStyle="italic"
            fill="#F2C97A"
          >
            A
          </text>
        </svg>
      </div>

      {/* Gold ornamental divider */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div
          className="h-px w-16"
          style={{
            background: "linear-gradient(to right, transparent, rgba(212,162,76,0.6))",
          }}
        />
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path
            d="M7 1 L7.9 5.5 L12.5 7 L7.9 8.5 L7 13 L6.1 8.5 L1.5 7 L6.1 5.5 Z"
            fill="#D4A24C"
            opacity="0.8"
          />
        </svg>
        <div
          className="h-px w-16"
          style={{
            background: "linear-gradient(to left, transparent, rgba(212,162,76,0.6))",
          }}
        />
      </div>

      {/* Quote */}
      <p
        className="font-serif italic text-xl md:text-2xl mb-5"
        style={{ color: "rgba(245,230,200,0.90)" }}
      >
        Together is a beautiful place to be
      </p>

      {/* Date */}
      <p
        className="font-sans text-xs tracking-[0.35em] uppercase"
        style={{ color: "rgba(212,162,76,0.65)" }}
      >
        18 · 05 · 2026
      </p>

      {/* Bottom micro-rule */}
      <div
        className="mt-8 mx-auto h-px w-24"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,162,76,0.4), transparent)",
        }}
      />
    </div>
  </footer>
);

export default Footer;