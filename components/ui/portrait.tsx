interface PortraitProps {
  className?: string;
  size?: number;
}

/**
 * Portrait component — shows the candidate's photo if available,
 * falls back to an elegant geometric placeholder.
 *
 * To add a real photo:
 *   1. Drop the image file at: public/images/portrait.jpg  (or .png / .webp)
 *   2. Change `src` below to "/images/portrait.jpg"
 *   3. Remove the `onError` handler
 */
export function Portrait({ className = '', size = 400 }: PortraitProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className}`}
      style={{ width: size, height: size, maxWidth: '100%' }}
    >
      {/* Geometric placeholder — replace with <Image> once photo is available */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-surface to-secondary-accent/20 flex items-center justify-center">
        {/* Abstract monogram / geometric shape */}
        <svg
          width="60%"
          height="60%"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Portrait placeholder — à remplacer par une photo réelle"
        >
          {/* Outer hexagon */}
          <polygon
            points="100,10 185,55 185,145 100,190 15,145 15,55"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-accent/40"
            fill="none"
          />
          {/* Inner hexagon */}
          <polygon
            points="100,35 165,72 165,128 100,165 35,128 35,72"
            stroke="currentColor"
            strokeWidth="1"
            className="text-accent/25"
            fill="none"
          />
          {/* Data nodes */}
          <circle cx="100" cy="10" r="3" className="fill-accent/60" />
          <circle cx="185" cy="55" r="3" className="fill-accent/60" />
          <circle cx="185" cy="145" r="3" className="fill-accent/60" />
          <circle cx="100" cy="190" r="3" className="fill-accent/60" />
          <circle cx="15" cy="145" r="3" className="fill-accent/60" />
          <circle cx="15" cy="55" r="3" className="fill-accent/60" />
          {/* Center monogram "AI" */}
          <text
            x="100"
            y="110"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="28"
            fontFamily="Space Grotesk, sans-serif"
            fontWeight="700"
            className="fill-accent/80"
          >
            AI
          </text>
          <text
            x="100"
            y="135"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontFamily="Inter, sans-serif"
            letterSpacing="3"
            className="fill-text-secondary/60"
          >
            ALAE IKHLAS
          </text>
        </svg>
      </div>

      {/* Decorative border glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-accent/20 pointer-events-none" />

      {/* Corner accent */}
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-accent/60 animate-pulse" />
    </div>
  );
}
