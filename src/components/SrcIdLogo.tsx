import React from "react";

export function SrcIdLogo({ className = "w-6 h-6", stroke = "currentColor" }: { className?: string; stroke?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 550 550"
      className={className}
    >
      <g transform="matrix(1, 0, 0, 1, 25, 25)">
        <g>
          <rect
            width="250"
            height="250"
            style={{
              stroke,
              paintOrder: "fill",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none",
              strokeWidth: "50px",
            }}
            x="250"
          />
          <rect
            width="250"
            height="250"
            style={{
              stroke,
              paintOrder: "fill",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none",
              strokeWidth: "50px",
            }}
            y="250"
          />
          <line
            style={{
              stroke,
              paintOrder: "fill",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              fill: "none",
              strokeWidth: "50px",
            }}
            x1="250"
            y1="250"
            x2="500"
            y2="500"
          />
        </g>
      </g>
    </svg>
  );
}
