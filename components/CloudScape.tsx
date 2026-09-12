const BLADE_D =
  "M0,0 C-6,-8 -4,-14 -8,-18 C-4,-20 -8,-26 -12,-30 C-7,-32 -10,-40 -14,-44 C-8,-46 -6,-56 0,-64 C6,-56 8,-46 14,-44 C10,-40 7,-32 12,-30 C8,-26 4,-20 8,-18 C4,-14 6,-8 0,0 Z";

const BLADES = [
  { angle: -78, scale: 0.58 },
  { angle: -52, scale: 0.78 },
  { angle: -26, scale: 0.94 },
  { angle: 0, scale: 1 },
  { angle: 26, scale: 0.94 },
  { angle: 52, scale: 0.78 },
  { angle: 78, scale: 0.58 },
];

function LeafShape({ shadow = false }: { shadow?: boolean }) {
  const groupProps = shadow
    ? { fill: "var(--ink)" }
    : { fill: "currentColor", stroke: "var(--ink)", strokeWidth: 3, strokeLinejoin: "round" as const };
  return (
    <g transform={shadow ? "translate(105,196)" : "translate(100,190)"}>
      {BLADES.map((b, i) => (
        <g key={i} transform={`rotate(${b.angle}) scale(${b.scale})`}>
          <path d={BLADE_D} {...groupProps} />
        </g>
      ))}
      <circle cx="0" cy="4" r="10" {...groupProps} />
    </g>
  );
}

function LeafCloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 210" className={className} aria-hidden="true">
      <LeafShape shadow />
      <LeafShape />
    </svg>
  );
}

const BONG_D =
  "M92 14 H108 V52 H118 C130 52 136 62 130 74 L120 96 V116 L146 138 C154 144 152 156 142 158 L120 150 V180 C150 180 168 198 168 210 H32 C32 198 50 180 80 180 V96 L70 74 C64 62 70 52 82 52 H92 Z";

function BongShape({ shadow = false }: { shadow?: boolean }) {
  const props = shadow
    ? { fill: "var(--ink)" }
    : { fill: "currentColor", stroke: "var(--ink)", strokeWidth: 4, strokeLinejoin: "round" as const };
  return <path d={BONG_D} transform={shadow ? "translate(5,6)" : undefined} {...props} />;
}

function BongCloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 218" className={className} aria-hidden="true">
      <BongShape shadow />
      <BongShape />
    </svg>
  );
}

const LIGHTER_D =
  "M84 8 C90 8 92 16 88 22 L84 30 H96 L92 22 C88 16 90 8 96 8 C104 8 108 18 102 26 L96 36 V52 H108 C118 52 124 58 124 68 V172 C124 184 116 192 104 192 H76 C64 192 56 184 56 172 V68 C56 58 62 52 72 52 H84 V36 L78 26 C72 18 76 8 84 8 Z";
const LIGHTER_LINE_D = "M60 140 H120";

function LighterShape({ shadow = false }: { shadow?: boolean }) {
  const props = shadow
    ? { fill: "var(--ink)" }
    : { fill: "currentColor", stroke: "var(--ink)", strokeWidth: 4, strokeLinejoin: "round" as const };
  return (
    <g transform={shadow ? "translate(5,6)" : undefined}>
      <path d={LIGHTER_D} {...props} />
      {!shadow && <path d={LIGHTER_LINE_D} stroke="var(--ink)" strokeWidth="3" />}
    </g>
  );
}

function LighterCloud({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 200" className={className} aria-hidden="true">
      <LighterShape shadow />
      <LighterShape />
    </svg>
  );
}

export function CloudScape() {
  return (
    <div className="cloudscape" aria-hidden="true">
      <LeafCloud className="cloud cloud-a text-leaf" />
      <LighterCloud className="cloud cloud-b text-coral" />
      <LeafCloud className="cloud cloud-c text-leaf" />
      <BongCloud className="cloud cloud-d text-bong" />
      <LighterCloud className="cloud cloud-e text-coral" />
      <BongCloud className="cloud cloud-f text-bong" />
    </div>
  );
}
