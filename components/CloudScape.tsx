function LeafCloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 180" className={className} aria-hidden="true">
      <g filter="url(#soften)">
        <path
          d="M110 20
             C118 42 132 50 154 46
             C142 62 142 78 158 92
             C138 90 124 98 116 116
             C112 98 100 90 82 90
             C96 78 96 62 84 48
             C104 52 116 44 110 20 Z"
          fill="currentColor"
        />
        <circle cx="60" cy="118" r="22" fill="currentColor" />
        <circle cx="84" cy="132" r="26" fill="currentColor" />
        <circle cx="116" cy="136" r="24" fill="currentColor" />
        <circle cx="146" cy="128" r="22" fill="currentColor" />
        <circle cx="168" cy="112" r="18" fill="currentColor" />
      </g>
      <filter id="soften">
        <feGaussianBlur stdDeviation="2.2" />
      </filter>
    </svg>
  );
}

function BongCloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 220" className={className} aria-hidden="true">
      <g filter="url(#soften2)">
        <path
          d="M92 18 H108 V56 H120 C132 56 138 66 132 78
             L118 104 V150 C150 150 168 168 168 190
             H32 C32 168 50 150 82 150
             V104 L68 78 C62 66 68 56 80 56
             H92 Z"
          fill="currentColor"
        />
        <circle cx="52" cy="176" r="20" fill="currentColor" />
        <circle cx="82" cy="188" r="24" fill="currentColor" />
        <circle cx="118" cy="188" r="24" fill="currentColor" />
        <circle cx="150" cy="176" r="20" fill="currentColor" />
      </g>
      <filter id="soften2">
        <feGaussianBlur stdDeviation="2.4" />
      </filter>
    </svg>
  );
}

function PlainCloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 100" className={className} aria-hidden="true">
      <g>
        <circle cx="55" cy="60" r="30" fill="currentColor" />
        <circle cx="90" cy="42" r="34" fill="currentColor" />
        <circle cx="130" cy="55" r="28" fill="currentColor" />
        <circle cx="160" cy="65" r="22" fill="currentColor" />
        <rect x="40" y="60" width="130" height="28" rx="14" fill="currentColor" />
      </g>
    </svg>
  );
}

export function CloudScape() {
  return (
    <div className="cloudscape" aria-hidden="true">
      <PlainCloud className="cloud cloud-a text-white" />
      <LeafCloud className="cloud cloud-b text-leaf/80" />
      <PlainCloud className="cloud cloud-c text-white" />
      <BongCloud className="cloud cloud-d text-bong/80" />
      <PlainCloud className="cloud cloud-e text-white" />
      <LeafCloud className="cloud cloud-f text-leaf/70" />
    </div>
  );
}
