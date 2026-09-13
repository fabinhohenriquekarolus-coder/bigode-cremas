function PlainCloud({ className = "" }: { className?: string }) {
  const d =
    "M32 92 C10 92 10 60 32 58 C26 34 58 22 74 38 C84 12 128 12 138 38 C156 22 188 36 180 58 C202 60 202 92 180 92 Z";
  return (
    <svg viewBox="0 0 212 106" className={className} aria-hidden="true">
      <path d={d} transform="translate(5,6)" fill="var(--ink)" opacity="0.15" />
      <path d={d} fill="#fff" stroke="var(--ink)" strokeWidth="3" strokeLinejoin="round" opacity="0.9" />
    </svg>
  );
}

export function CloudScape() {
  return (
    <div className="cloudscape" aria-hidden="true">
      <PlainCloud className="cloud cloud-a" />
      <PlainCloud className="cloud cloud-b" />
      <PlainCloud className="cloud cloud-c" />
      <PlainCloud className="cloud cloud-d" />
      <PlainCloud className="cloud cloud-e" />
      <PlainCloud className="cloud cloud-f" />
    </div>
  );
}
