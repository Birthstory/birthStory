import { useMemo } from "react";
import type { SVGProps, ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";

/* ================= Types ================= */
type IconType = React.FC<SVGProps<SVGSVGElement>>;

interface MediaItem {
  title: string;
  subtitle?: string;
  emoji: string;
}

/* ================= Utils ================= */
function normalizeDateString(raw: string | null): string {
  if (!raw) return "";
  const only = raw.replace(/[^0-9]/g, "");
  if (only.length !== 8) return "";
  return `${only.slice(0, 4)}.${only.slice(4, 6)}.${only.slice(6, 8)}`;
}

function toDate(value: string) {
  if (!value) return null;
  const [y, m, d] = value.split(".").map(Number);
  const dt = new Date(y, m - 1, d);
  return isNaN(dt.getTime()) ? null : dt;
}

function formatLongDate(dt: Date | null) {
  if (!dt) return "—";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dt);
}

function useBirthday() {
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);
  const raw = params.get("date") || params.get("birthday");
  const normalized = normalizeDateString(raw);
  const date = toDate(normalized);
  return { normalized, date };
}

/* ================= Icons ================= */
const NewsIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="7" y1="8" x2="17" y2="8" />
    <line x1="7" y1="12" x2="13" y2="12" />
    <line x1="7" y1="16" x2="11" y2="16" />
  </svg>
);
const MovieIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <rect x="3" y="6" width="18" height="12" rx="2" />
    <circle cx="8" cy="9" r="1.3" />
    <circle cx="12" cy="9" r="1.3" />
    <circle cx="16" cy="9" r="1.3" />
  </svg>
);
const FashionIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <path d="M8 5l4 2 4-2 2 3-3 2v9H9V10L6 8l2-3z" />
  </svg>
);
const MusicIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <path d="M9 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm6-10v10" />
    <polyline points="15 8 21 6 21 16" />
  </svg>
);
const AstroIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <circle cx="12" cy="12" r="5" />
    <path d="M2 12c4-6 16-6 20 0" />
  </svg>
);
const ChartIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <rect x="3" y="11" width="4" height="8" rx="1" />
    <rect x="10" y="8" width="4" height="11" rx="1" />
    <rect x="17" y="5" width="4" height="14" rx="1" />
  </svg>
);

/* ================= Page ================= */
export default function BirthStoryDashboard() {
  const { date } = useBirthday();
  const year = date?.getFullYear();

  // Placeholder data (API 연결 전 데모)
  const newsBullets: string[] = [
    `Headlines from ${year ?? "—"}`,
    "Sample news A · Sample news B",
    "Replace with real API later",
  ];

  const movies: MediaItem[] = [
    { title: "Home Alone", subtitle: "Comedy", emoji: "🎬" },
    { title: "Ghost", subtitle: "Drama", emoji: "👻" },
    { title: "Pretty Woman", subtitle: "Romance", emoji: "💖" },
  ];

  const topHits: MediaItem[] = [
    { title: "Billie Jean", subtitle: "#1", emoji: "🎵" },
    { title: "Like a Prayer", subtitle: "#2", emoji: "🎶" },
    { title: "Beat It", subtitle: "#3", emoji: "🎧" },
  ];

  const fashion: MediaItem[] = [
    { title: "Denim Jacket", emoji: "🧥" },
    { title: "High Tops", emoji: "👟" },
    { title: "Retro Tee", emoji: "👕" },
  ];

  const circles: { title: string; icon: IconType; tint: string; emoji: string }[] = [
    { title: "Magazine Covers", icon: NewsIcon, tint: "from-amber-300/30", emoji: "📰" },
    { title: "Billboard Charts", icon: ChartIcon, tint: "from-emerald-300/30", emoji: "📈" },
    { title: "TV & Anime", icon: MovieIcon, tint: "from-sky-300/30", emoji: "📺" },
    { title: "Astronomy", icon: AstroIcon, tint: "from-fuchsia-300/30", emoji: "✨" },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0b1020] text-white">
      {/* nebula background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 20% 30%, rgba(56,189,248,.18), transparent 60%), radial-gradient(900px 700px at 80% 45%, rgba(168,85,247,.20), transparent 60%), radial-gradient(600px 500px at 60% 75%, rgba(244,114,182,.15), transparent 60%)",
        }}
      />

      {/* header */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <Link to="/" className="flex items-center gap-2 font-bold tracking-tight opacity-90 hover:opacity-100">
          <div className="grid size-8 place-items-center rounded-full bg-white/10">
            <StarLogo />
          </div>
          <span className="text-sm sm:text-base">BIRTHDAY UNIVERSE</span>
        </Link>
        <nav className="hidden sm:flex items-center gap-8 text-sm opacity-85">
          <a className="hover:opacity-100" href="#home">HOME</a>
          <a className="hover:opacity-100" href="#themes">THEMES</a>
          <a className="hover:opacity-100" href="#about">ABOUT</a>
          <a className="rounded-full bg-white/10 px-4 py-1.5 hover:bg-white/20" href="#login">LOGIN</a>
        </nav>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16">
        {/* Title */}
        <div className="py-6 text-center">
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            YOUR BIRTHDAY <span className="text-indigo-300">UNIVERSE</span>
          </h1>
          <p className="mt-1 text-xs text-white/70">Based on your birthday: {formatLongDate(date)}</p>
        </div>

        {/* Grid sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* News */}
          <SectionCard className="md:col-span-3" title="NEWS" icon={<NewsIcon className="size-5" />}>
            <ul className="space-y-1 text-xs text-white/80">
              {newsBullets.map((t, i) => (
                <li key={i}>• {t}</li>
              ))}
            </ul>
          </SectionCard>

          {/* Movies */}
          <SectionCard className="md:col-span-4" title="MOVIES" icon={<MovieIcon className="size-5" />}>
            <PosterRow items={movies} />
          </SectionCard>

          {/* Top hits */}
          <SectionCard
            className="md:col-span-3"
            title={`TOP HITS OF ${year ?? "—"}`}
            icon={<MusicIcon className="size-5" />}
          >
            <PosterRow items={topHits} />
          </SectionCard>

          {/* Fashion */}
          <SectionCard className="md:col-span-2" title="FASHION" icon={<FashionIcon className="size-5" />}>
            <PosterRow items={fashion} />
          </SectionCard>

          {/* Bottom circles */}
          {circles.map((c) => (
            <CircleCard
              key={c.title}
              className="md:col-span-3"
              title={c.title}
              icon={<c.icon className="size-5" />}
              tint={c.tint}
              emoji={c.emoji}
            />
          ))}
        </div>

        {/* footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
          <a href="#" className="hover:text-white/80">Terms of Service</a>
          <a href="#" className="hover:text-white/80">Privacy Policy</a>
          <a href="#" className="hover:text-white/80">Contact Us</a>
        </div>
      </main>
    </div>
  );
}

/* ================= UI Blocks ================= */
function SectionCard({
  title,
  icon,
  children,
  className = "",
}: {
  title: string;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,.25)] ${className}`}>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90">
        {icon && <span className="text-white/80">{icon}</span>}
        <span>{title}</span>
      </div>
      {children}
    </div>
  );
}

function PosterRow({ items }: { items: MediaItem[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map((m) => (
        <div
          key={m.title}
          className="rounded-lg bg-gradient-to-br from-white/10 to-white/5 p-2 ring-1 ring-white/10"
        >
          <div className="aspect-[3/4] w-full rounded-md bg-gradient-to-br from-indigo-400/30 to-fuchsia-400/30 grid place-items-center text-3xl">
            <span>{m.emoji}</span>
          </div>
          <div className="mt-1 truncate text-[11px] font-medium text-white/90">{m.title}</div>
          {m.subtitle && <div className="text-[10px] text-white/70">{m.subtitle}</div>}
        </div>
      ))}
    </div>
  );
}

function CircleCard({
  title,
  icon,
  tint,
  emoji,
  className = "",
}: {
  title: string;
  icon?: ReactNode;
  tint?: string;
  emoji: string;
  className?: string;
}) {
  return (
    <div className={`rounded-2xl bg-white/10 p-4 ring-1 ring-white/10 backdrop-blur shadow-[0_10px_40px_rgba(0,0,0,.25)] ${className}`}>
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90">
        {icon && <span className="text-white/80">{icon}</span>}
        <span>{title}</span>
      </div>
      <div
        className={`mx-auto aspect-square w-40 rounded-full bg-white/10 ring-1 ring-white/10 grid place-items-center text-4xl bg-gradient-to-br ${tint || "from-white/20"} to-transparent`}
      >
        <span>{emoji}</span>
      </div>
    </div>
  );
}

const StarLogo: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="size-4 opacity-90" {...props}>
    <path d="M12 2l2.7 5.5L20 9l-4 3.9L17.4 19 12 16.3 6.6 19 8 12.9 4 9l5.3-1.5L12 2z" />
  </svg>
);
