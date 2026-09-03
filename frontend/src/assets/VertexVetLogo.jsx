import React from 'react';

export const VertexVetLogo = ({ size = 'md', variant = 'full', theme = 'dark', className = '' }) => {
  // Size mapping
  const sizeMap = {
    sm: { icon: 24, font: 'text-base', sub: 'text-[9px]' },
    md: { icon: 32, font: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 40, font: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 52, font: 'text-3xl', sub: 'text-sm' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;
  const isDark = theme === 'dark';

  const iconSvg = (
    <svg
      width={currentSize.icon}
      height={currentSize.icon}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
    >
      <defs>
        <linearGradient id="vertexVetGrad" x1="4" y1="4" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0d9488" />
          <stop offset="0.5" stopColor="#0f766e" />
          <stop offset="1" stopColor="#4f46e5" />
        </linearGradient>
        <linearGradient id="vetCrossGrad" x1="16" y1="16" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#ccfbf1" />
        </linearGradient>
      </defs>

      {/* Hexagonal Shield Foundation */}
      <rect
        x="3"
        y="3"
        width="42"
        height="42"
        rx="12"
        fill="url(#vertexVetGrad)"
        className="drop-shadow-md"
      />
      <rect
        x="4"
        y="4"
        width="40"
        height="40"
        rx="11"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
      />

      {/* Stylized Clinical Cross + Vertex Node */}
      <path
        d="M24 13V35M13 24H35"
        stroke="url(#vetCrossGrad)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Precision Node Rings */}
      <circle cx="24" cy="24" r="3.5" fill="#ffffff" />
      <circle cx="24" cy="24" r="6" stroke="#ccfbf1" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );

  if (variant === 'icon') {
    return <div className={`inline-flex items-center ${className}`}>{iconSvg}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none group ${className}`}>
      {iconSvg}
      <div className="flex flex-col">
        <div className="flex items-baseline tracking-tight font-display font-extrabold leading-none">
          <span className={isDark ? 'text-white' : 'text-slate-900'}>VERTEX</span>
          <span className="ml-1 text-teal-500 font-bold">Vet</span>
        </div>
        <span className={`tracking-widest font-medium uppercase mt-0.5 ${currentSize.sub} ${
          isDark ? 'text-slate-400' : 'text-slate-500'
        }`}>
          Suite Vertex
        </span>
      </div>
    </div>
  );
};

export default VertexVetLogo;
