"use client";

type ProgressDotsProps = {
  total: number;
  current: number;
};

export function ProgressDots({ total, current }: ProgressDotsProps) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          className="relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ease-out"
          style={{
            width: i === current ? 32 : 8,
            backgroundColor:
              i < current
                ? "rgba(255, 255, 255, 0.5)"
                : i === current
                  ? "rgba(255, 255, 255, 0.9)"
                  : "rgba(255, 255, 255, 0.15)",
          }}
        >
          {i === current && (
            <div
              className="absolute inset-0 rounded-full bg-white"
              style={{
                animation: "progressPulse 2s ease-in-out infinite",
              }}
            />
          )}
        </div>
      ))}

      <style jsx>{`
        @keyframes progressPulse {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
