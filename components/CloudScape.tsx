function LeafCloud({ className = "" }: { className?: string }) {
  const d =
    "M110 20 C118 42 132 50 154 46 C142 62 142 78 158 92 C138 90 124 98 116 116 C112 98 100 90 82 90 C96 78 96 62 84 48 C104 52 116 44 110 20 Z";
  return (
    <svg viewBox="0 0 220 190" className={className} aria-hidden="true">
      <g transform="translate(5,6)" fill="var(--ink)">
        <path d={d} />
        <circle cx="60" cy="118" r="22" />
        <circle cx="84" cy="132" r="26" />
        <circle cx="116" cy="136" r="24" />
        <circle cx="146" cy="128" r="22" />
        <circle cx="168" cy="112" r="18" />
      </g>
      <g fill="currentColor" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round">
        <path d={d} />
        <circle cx="60" cy="118" r="22" />
        <circle cx="84" cy="132" r="26" />
        <circle cx="116" cy="136" r="24" />
        <circle cx="146" cy="128" r="22" />
        <circle cx="168" cy="112" r="18" />
      </g>
    </svg>
  );
}

function BongCloud({ className = "" }: { className?: string }) {
  const d =
    "M92 18 H108 V56 H120 C132 56 138 66 132 78 L118 104 V150 C150 150 168 168 168 190 H32 C32 168 50 150 82 150 V104 L68 78 C62 66 68 56 80 56 H92 Z";
  return (
    <svg viewBox="0 0 200 232" className={className} aria-hidden="true">
      <g transform="translate(5,6)" fill="var(--ink)">
        <path d={d} />
        <circle cx="52" cy="176" r="20" />
        <circle cx="82" cy="188" r="24" />
        <circle cx="118" cy="188" r="24" />
        <circle cx="150" cy="176" r="20" />
      </g>
      <g fill="currentColor" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round">
        <path d={d} />
        <circle cx="52" cy="176" r="20" />
        <circle cx="82" cy="188" r="24" />
        <circle cx="118" cy="188" r="24" />
        <circle cx="150" cy="176" r="20" />
      </g>
    </svg>
  );
}

function PlainCloud({ className = "" }: { className?: string }) {
  const d =
    "M32 92 C10 92 10 60 32 58 C26 34 58 22 74 38 C84 12 128 12 138 38 C156 22 188 36 180 58 C202 60 202 92 180 92 Z";
  return (
    <svg viewBox="0 0 212 106" className={className} aria-hidden="true">
      <path d={d} transform="translate(5,6)" fill="var(--ink)" />
      <path d={d} fill="#fff" stroke="var(--ink)" strokeWidth="4" strokeLinejoin="round" />
    </svg>
  );
}

export function CloudScape() {
  return (
    <div className="cloudscape" aria-hidden="true">
      <PlainCloud className="cloud cloud-a" />
      <LeafCloud className="cloud cloud-b text-leaf" />
      <PlainCloud className="cloud cloud-c" />
      <BongCloud className="cloud cloud-d text-bong" />
      <PlainCloud className="cloud cloud-e" />
      <LeafCloud className="cloud cloud-f text-leaf" />
    </div>
  );
}
