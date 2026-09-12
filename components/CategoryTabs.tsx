import Link from "next/link";

export function CategoryTabs({
  categories,
  active,
}: {
  categories: string[];
  active: string | null;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href="/"
        className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
          !active
            ? "border-accent bg-accent text-cloud"
            : "border-panel-line bg-cloud text-ink hover:border-ink-dim"
        }`}
      >
        Todos
      </Link>
      {categories.map((c) => (
        <Link
          key={c}
          href={`/?categoria=${encodeURIComponent(c)}`}
          className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
            active === c
              ? "border-accent bg-accent text-cloud"
              : "border-panel-line bg-cloud text-ink hover:border-ink-dim"
          }`}
        >
          {c}
        </Link>
      ))}
    </div>
  );
}
