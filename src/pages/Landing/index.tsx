import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ========= types ========= */
type IconType = React.FC<React.SVGProps<SVGSVGElement>>;
interface ConfettiItem { id: string; x: number; delay: number; rot: number; }

/* ========= component ========= */
export default function BirthStoryLanding() {
  const navigate = useNavigate();

  const today = new Date();
  const [month, setMonth] = useState<number>(today.getMonth() + 1);
  const [day, setDay] = useState<number>(today.getDate());
  const [year, setYear] = useState<number>(1990);
  const [error, setError] = useState<string>("");
  const [confetti, setConfetti] = useState<ConfettiItem[]>([]);

  const daysInMonth = useMemo(
    () => new Date(year || 2000, month, 0).getDate(),
    [month, year]
  );

  const categories: { label: string; icon: IconType; slug: string }[] = [
    { label: "NEWS", icon: NewsIcon, slug: "news" },
    { label: "MOVIES", icon: MovieIcon, slug: "movie" },
    { label: "BILLBOARD", icon: BillboardIcon, slug: "billboard" },
    { label: "FASHION", icon: FashionIcon, slug: "fashion" },
    { label: "ASTRONOMY", icon: AstroIcon, slug: "astronomy" },
    { label: "DRAMA", icon: DramaIcon, slug: "drama" },
  ];

  function pad(n: number) {
    return String(n).padStart(2, "0");
  }

  function onExplore() {
    setError("");
    if (!year || year < 1900 || year > 2100) {
      setError("Please enter a valid year (1900–2100)");
      return;
    }
    if (day > daysInMonth) {
      setError("Invalid day for that month");
      return;
    }

    // subtle confetti only if today (no 텍스트)
    if (month === today.getMonth() + 1 && day === today.getDate()) {
      const items: ConfettiItem[] = Array.from({ length: 18 }).map(() => ({
        id: Math.random().toString(36).slice(2),
        x: Math.random() * 100,
        delay: Math.random() * 0.4,
        rot: Math.random() * 360,
      }));
      setConfetti(items);
      setTimeout(() => setConfetti([]), 1500);
    }

    const dateStr = `${year}.${pad(month)}.${pad(day)}`;
    navigate(`/dashboard?date=${encodeURIComponent(dateStr)}`);
  }

  return (
    <div className="min-h-screen w-full bg-[#0b1020] text-white">
      {/* space / nebula background */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0"
        style={{
          backgroundImage:
            "radial-gradient(1200px 600px at 20% 30%, rgba(56,189,248,.18), transparent 60%), radial-gradient(900px 700px at 80% 45%, rgba(168,85,247,.20), transparent 60%), radial-gradient(600px 500px at 60% 75%, rgba(244,114,182,.15), transparent 60%)",
        }}
      />

      {/* top nav */}
      <header className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5">
        <a href="/" className="flex items-center gap-2 font-bold tracking-tight opacity-90 hover:opacity-100">
          <div className="grid h-8 w-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
            <StarLogo />
          </div>
          <span className="text-sm sm:text-base">BIRTHDAY UNIVERSE</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm opacity-85 sm:flex">
          <a className="hover:opacity-100" href="#home">HOME</a>
          <a className="hover:opacity-100" href="#themes">THEMES</a>
          <a className="hover:opacity-100" href="#about">ABOUT</a>
          <a className="rounded-full bg-white/10 px-4 py-1.5 ring-1 ring-white/15 hover:bg-white/20" href="#login">LOGIN</a>
        </nav>
      </header>

      {/* hero */}
      <main className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center px-6 pb-16">
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            YOUR BIRTHDAY
            <span className="block bg-gradient-to-r from-sky-300 via-indigo-300 to-fuchsia-300 bg-clip-text text-transparent">
              UNIVERSE
            </span>
          </h1>
          <p className="mt-2 text-sm text-white/70">Enter Your Birthday to Explore</p>
        </div>

        {/* ring UI */}
        <div className="mt-10 grid w-full max-w-3xl items-center justify-items-center">
          <div className="relative h-[22rem] w-[22rem] sm:h-[24rem] sm:w-[24rem]">
            {/* center card (form) */}
            <div className="absolute left-1/2 top-1/2 w-[15rem] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white/10 p-4 text-center shadow-[0_10px_50px_rgba(0,0,0,.35)] ring-1 ring-white/15 backdrop-blur">
              <div className="grid grid-cols-3 gap-2">
                <Select label="Month" value={month} onChange={(v) => setMonth(Number(v))}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </Select>
                <Select label="Day" value={day} onChange={(v) => setDay(Number(v))}>
                  {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </Select>
                <Input
                  label="Year"
                  type="number"
                  placeholder="YYYY"
                  value={year}
                  onChange={(v) => setYear(Number(v))}
                />
              </div>

              {error && <div className="mt-2 text-xs text-rose-300">{error}</div>}

              <button
                onClick={onExplore}
                className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-indigo-500/90 px-4 py-2 text-sm font-semibold text-white ring-1 ring-indigo-300/40 hover:bg-indigo-400"
              >
                EXPLORE
              </button>
            </div>

            {/* ring dots */}
            <div className="absolute left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full ring-1 ring-white/10" />

            {/* ring items */}
            {categories.map((c, i) => {
              const angle = (i / categories.length) * Math.PI * 2 - Math.PI / 2; // start at top
              const R = 150; // radius (px)
              const centerX = 176; // half of 22rem ≈ 352px/2
              const centerY = 176;
              const x = centerX + Math.cos(angle) * R;
              const y = centerY + Math.sin(angle) * R;
              const Icon = c.icon;
              return (
                <a
                  key={c.slug}
                  href={`/${c.slug}`}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/8 px-3 py-2 text-[11px] uppercase tracking-wide text-white/90 backdrop-blur ring-1 ring-white/15 hover:bg-white/15"
                  style={{ left: x, top: y }}
                >
                  <span className="mr-2 inline-grid h-7 w-7 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
                    <Icon className="h-4 w-4 opacity-90" />
                  </span>
                  {c.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* footer */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-xs text-white/60">
          <a href="#" className="hover:text-white/80">Terms of Service</a>
          <a href="#" className="hover:text-white/80">Privacy Policy</a>
          <a href="#" className="hover:text-white/80">Contact Us</a>
        </div>
      </main>

      {/* confetti layer (no text) */}
      <div className="pointer-events-none fixed inset-0 z-20 overflow-hidden">
        {confetti.map((c) => (
          <span
            key={c.id}
            style={{ left: `${c.x}%`, animationDelay: `${c.delay}s`, transform: `rotate(${c.rot}deg)` }}
            className="absolute -top-10 select-none text-xl [animation:fall_1.4s_ease-in_forwards]"
          >
            🎉
          </span>
        ))}
      </div>

      {/* local keyframes */}
      <style>{`
        @keyframes fall {
          to { transform: translateY(120vh) rotate(360deg); opacity: .6; }
        }
      `}</style>
    </div>
  );
}

/* ========= UI primitives ========= */
interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange" | "value"> {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
}
function Input({ label, value, onChange, ...props }: InputProps) {
  return (
    <label className="text-left">
      <div className="mb-1 text-[11px] text-white/70">{label}</div>
      <input
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border-0 bg-white/10 px-3 py-2 text-sm text-white placeholder-white/40 outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-sky-300"
      />
    </label>
  );
}

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange" | "value"> {
  label: string;
  value: number | string;
  onChange: (value: string) => void;
}
function Select({ label, value, onChange, children, ...props }: SelectProps) {
  return (
    <label className="text-left">
      <div className="mb-1 text-[11px] text-white/70">{label}</div>
      <select
        {...props}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg bg-white/10 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/15 focus:ring-2 focus:ring-sky-300"
      >
        {children}
      </select>
    </label>
  );
}

/* ========= icons ========= */
const StarLogo: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="h-4 w-4 opacity-90" {...props}>
    <path d="M12 2l2.7 5.5L20 9l-4 3.9L17.4 19 12 16.3 6.6 19 8 12.9 4 9l5.3-1.5L12 2z" />
  </svg>
);
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
const AstroIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <circle cx="12" cy="12" r="5" />
    <path d="M2 12c4-6 16-6 20 0" />
  </svg>
);
const BillboardIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <rect x="3" y="4" width="18" height="10" rx="2" />
    <line x1="7" y1="18" x2="7" y2="22" />
    <line x1="17" y1="18" x2="17" y2="22" />
  </svg>
);
const DramaIcon: IconType = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} {...props}>
    <path d="M4 6h16v9c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V6z" />
    <path d="M9 10h.01M15 10h.01" />
    <path d="M8 13c1.2.9 2.8.9 4 0" />
  </svg>
);
