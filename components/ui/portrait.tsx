interface PortraitProps {
  className?: string;
  size?: number;
}

/**
 * Portrait component — shows the candidate's photo if available,
 * falls back to an elegant architectural geometric placeholder inspired by MaisonDeLUX.
 *
 * To add a real photo:
 *   1. Drop the image file at: public/images/portrait.jpg  (or .png / .webp)
 *   2. Change placeholder below to <Image src="/images/portrait.jpg" ... />
 */
export function Portrait({ className = '', size = 380 }: PortraitProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl card ${className}`}
      style={{ width: size, height: size, maxWidth: '100%' }}
    >
      {/* Geometric architectural placeholder */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          background: 'color-mix(in srgb, var(--bg-surface) 90%, var(--bg-primary))',
        }}
      >
        {/* Subtle background grid */}
        <div className="architectural-grid absolute inset-0 opacity-40" />

        {/* Abstract monogram / geometric composition */}
        <svg
          width="70%"
          height="70%"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Portrait placeholder — à remplacer par une photo réelle"
          className="relative z-10"
        >
          {/* Outer circle with coordinate ticks */}
          <circle
            cx="100"
            cy="100"
            r="82"
            stroke="var(--border)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="70"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeDasharray="3 3"
            opacity="0.4"
          />

          {/* Coordinate axis lines */}
          <line x1="100" y1="20" x2="100" y2="180" stroke="var(--border)" strokeWidth="0.75" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="var(--border)" strokeWidth="0.75" />

          {/* Inner hexagon */}
          <polygon
            points="100,45 148,72 148,128 100,155 52,128 52,72"
            stroke="var(--accent)"
            strokeWidth="1.25"
            opacity="0.6"
            fill="none"
          />

          {/* Corner points */}
          <circle cx="100" cy="45" r="2.5" fill="var(--accent)" />
          <circle cx="148" cy="72" r="2.5" fill="var(--accent)" />
          <circle cx="148" cy="128" r="2.5" fill="var(--accent)" />
          <circle cx="100" cy="155" r="2.5" fill="var(--accent)" />
          <circle cx="52" cy="128" r="2.5" fill="var(--accent)" />
          <circle cx="52" cy="72" r="2.5" fill="var(--accent)" />

          {/* Center monogram "AI" */}
          <text
            x="100"
            y="98"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="26"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            fill="var(--text-primary)"
          >
            AI
          </text>
          <text
            x="100"
            y="118"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="8"
            fontFamily="Inter, sans-serif"
            fontWeight="600"
            letterSpacing="3"
            fill="var(--text-muted)"
          >
            ALAE IKHLAS
          </text>
        </svg>
      </div>

      {/* Frame border */}
      <div
        className="absolute inset-0 rounded-2xl border pointer-events-none"
        style={{ borderColor: 'var(--border)' }}
      />
    </div>
  );
}
