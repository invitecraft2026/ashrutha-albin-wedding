const Footer = () => (
  <footer className="py-16 px-6 bg-sage text-cream text-center">
    {/* Floral wreath with monogram */}
    <div className="mb-8">
      <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto">
        <circle cx="60" cy="60" r="45" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.5" />
        <circle cx="60" cy="60" r="50" fill="none" stroke="hsl(var(--pistachio))" strokeWidth="0.5" opacity="0.4" />
        {/* Leaf decorations */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="60"
            cy="15"
            rx="4"
            ry="10"
            fill="hsl(var(--pistachio))"
            opacity="0.5"
            transform={`rotate(${angle} 60 60)`}
          />
        ))}
        {/* Monogram */}
        <text
          x="60"
          y="55"
          textAnchor="middle"
          fontFamily="'Great Vibes', cursive"
          fontSize="22"
          fill="hsl(var(--gold))"
        >
          N
        </text>
        <text
          x="60"
          y="68"
          textAnchor="middle"
          fontSize="12"
          fill="hsl(var(--cream))"
        >
          ♡
        </text>
        <text
          x="60"
          y="82"
          textAnchor="middle"
          fontFamily="'Great Vibes', cursive"
          fontSize="22"
          fill="hsl(var(--gold))"
        >
          A
        </text>
      </svg>
    </div>

    <p className="font-display italic text-xl md:text-2xl text-cream/90 mb-4">
      Together is a beautiful place to be
    </p>

    <p className="font-body text-cream/60 text-sm tracking-[0.3em]">
      11 · 05 · 2026
    </p>
  </footer>
);

export default Footer;
