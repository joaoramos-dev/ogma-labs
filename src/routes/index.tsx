import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  Sparkles,
  Workflow,
  ShieldCheck,
  PenTool,
  Palette,
  Compass,
  Share2,
  CloudCog,
  Phone,
  Mail,
  MessageCircle,
  Linkedin,
  Instagram,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
});

const nav = [
  { label: "Who we are", href: "#who" },
  { label: "Services", href: "#services" },
  { label: "Principles", href: "#principles" },
  { label: "Stories", href: "#stories" },
  { label: "Contact", href: "#contact" },
];

const services = [
  {
    icon: Code2,
    title: "Software Engineering",
    body: "Systems built to carry a business for years, not quarters. Solid foundations that grow with your ambition.",
  },
  {
    icon: Sparkles,
    title: "Artificial Intelligence",
    body: "AI that gives your team back the hours they lose to repetition, and answers the questions they didn't know to ask.",
  },
  {
    icon: Workflow,
    title: "Business Automation",
    body: "Quiet, reliable workflows that remove friction from the work your people actually want to be doing.",
  },
  {
    icon: ShieldCheck,
    title: "Cybersecurity",
    body: "Protection built into the way you work, so trust with your customers is something you keep, not something you claim.",
  },
  {
    icon: PenTool,
    title: "UI/UX Design",
    body: "Interfaces that respect the person on the other side of the screen and make complex things feel effortless.",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    body: "A visual language that sounds like you. Recognisable in a moment, memorable for a long time.",
  },
  {
    icon: Compass,
    title: "Digital Strategy",
    body: "A clear direction for what to build, in what order, and why. Fewer bets, more meaningful ones.",
  },
  {
    icon: Share2,
    title: "Social Media",
    body: "Presence with a point of view. Stories that gather the right people around what you're building.",
  },
  {
    icon: CloudCog,
    title: "Cloud Infrastructure",
    body: "Infrastructure that stays out of the way — resilient when it matters, invisible the rest of the time.",
  },
];

const principles = [
  {
    n: "01",
    title: "Knowledge before technology",
    body: "We understand your business before we choose a single tool. The best solution is the one that fits the question.",
  },
  {
    n: "02",
    title: "People before processes",
    body: "We build for the humans who use what we make — customers, teams, and everyone in between.",
  },
  {
    n: "03",
    title: "Security before scale",
    body: "Growth without safety is fragility. We design trust into the foundations.",
  },
  {
    n: "04",
    title: "Design with purpose",
    body: "Every pixel, every flow, every line of copy is there for a reason — or it isn't there at all.",
  },
  {
    n: "05",
    title: "Long-term partnership",
    body: "We stay close after the launch. The product only starts to matter once real people begin to use it.",
  },
];

const stories = [
  {
    tag: "Family retail — 3 generations",
    title: "A shop that could finally see itself.",
    body: "A family-run retailer knew every customer by name but nothing about their own numbers. We built a quiet operations layer that turned decades of paperwork into daily clarity — and gave the next generation the confidence to lead.",
    impact: "42% less admin. Two new roles created. A grandfather retired on his terms.",
  },
  {
    tag: "Regional healthcare network",
    title: "Care that arrives before the paperwork.",
    body: "A network of clinics was losing hours to intake forms and duplicated records. We designed a secure, gentle system that handles the routine, so nurses can spend those minutes with patients instead of screens.",
    impact: "31% shorter waiting times. A team that stopped taking work home.",
  },
  {
    tag: "Independent industrial manufacturer",
    title: "A workshop that talks to itself.",
    body: "A specialist manufacturer wanted to modernise without losing what made them distinctive. We connected the workshop, the office and the customer into one honest source of truth — no more phone calls to find out what's happening.",
    impact: "3.2× faster quoting. Zero missed deadlines in the first year.",
  },
];

function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-dvh bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-background/70 border-b border-border/60"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="flex items-center gap-2">
            <Logo />
            <span className="font-display text-xl leading-none">OGMA</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-4 py-2 text-sm font-medium text-foreground transition-all hover:bg-foreground hover:text-background"
          >
            Let's talk
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <a
            href="#contact"
            className="md:hidden inline-flex items-center rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background"
          >
            Talk
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden bg-radial-glow text-ivory">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <AbstractLines />
          <div className="relative mx-auto flex min-h-dvh max-w-7xl flex-col justify-center px-6 pt-32 pb-24 lg:px-10">
            <div className="max-w-4xl">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-ivory/15 bg-ivory/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-ivory/70 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-copper" />
                Das ideias nascem os mundos
              </div>
              <h1 className="font-display text-5xl leading-[1.02] text-balance sm:text-6xl md:text-7xl lg:text-8xl">
                Every great company
                <br />
                begins with an <em className="text-copper not-italic italic">idea.</em>
                <br />
                <span className="text-ivory/70">
                  We help build everything that comes after.
                </span>
              </h1>
              <p className="mt-10 max-w-xl text-lg text-ivory/70 text-pretty">
                OGMA is a technology partner for businesses that want to grow
                without losing what makes them worth growing.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2 rounded-full bg-copper px-7 py-4 text-sm font-medium text-ivory transition-all hover:brightness-110"
                >
                  Let's Build Together
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#who"
                  className="inline-flex items-center gap-2 rounded-full border border-ivory/20 px-7 py-4 text-sm font-medium text-ivory transition-colors hover:bg-ivory/10"
                >
                  Our story
                </a>
              </div>
            </div>

            <div className="mt-24 grid grid-cols-2 gap-8 border-t border-ivory/10 pt-10 md:mt-32 md:grid-cols-4">
              {[
                ["12+", "Years building"],
                ["80+", "Partners, not clients"],
                ["9", "Disciplines under one roof"],
                ["1", "Belief: people first"],
              ].map(([k, v]) => (
                <div key={v}>
                  <div className="font-display text-4xl text-copper">{k}</div>
                  <div className="mt-2 text-sm text-ivory/60">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section id="who" className="relative py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel>Who we are</SectionLabel>
              </div>
              <div className="lg:col-span-8">
                <h2 className="font-display text-4xl leading-[1.1] text-balance sm:text-5xl md:text-6xl">
                  A name borrowed from a Celtic guardian of{" "}
                  <em className="italic text-copper">knowledge</em> and{" "}
                  <em className="italic text-copper">communication</em>.
                </h2>
                <div className="mt-12 grid gap-10 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
                  <p>
                    OGMA was the Celtic keeper of language — the one who
                    carried meaning between people. It felt like the right name
                    for a company that believes knowledge is only valuable when
                    it creates real change in someone's life.
                  </p>
                  <p>
                    We are engineers, designers, strategists and quiet
                    optimists. We help businesses grow by removing the
                    technological weight that sits between an idea and the
                    people it was meant to serve.
                  </p>
                </div>
                <blockquote className="mt-16 border-l-2 border-copper pl-8">
                  <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                    "Some ideas become businesses. Others change communities.
                    Our work is to make sure the technology is never what stops
                    them."
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative border-y border-border/60 bg-secondary/40 py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>What we do</SectionLabel>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                  Nine disciplines,
                  <br />
                  one way of working.
                </h2>
              </div>
              <p className="max-w-md text-muted-foreground">
                We measure our work by what it changes for the people using it —
                not by the tools we chose along the way.
              </p>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div
                  key={s.title}
                  className="group relative flex flex-col justify-between bg-card p-8 transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-copper/10 text-copper transition-colors group-hover:bg-copper group-hover:text-ivory">
                      <s.icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/70">
                      {s.body}
                    </p>
                  </div>
                  <ArrowUpRight className="mt-10 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-primary-foreground" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY OGMA / PRINCIPLES */}
        <section id="principles" className="py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel>Why OGMA</SectionLabel>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl">
                  Five principles we keep, even when it's harder.
                </h2>
              </div>
              <div className="lg:col-span-8">
                <ul className="divide-y divide-border border-y border-border">
                  {principles.map((p) => (
                    <li
                      key={p.n}
                      className="group grid grid-cols-[auto_1fr] gap-8 py-8 md:grid-cols-[80px_1fr_auto] md:gap-12 md:py-10"
                    >
                      <span className="font-display text-2xl text-copper">{p.n}</span>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
                        <p className="mt-3 max-w-xl text-muted-foreground">{p.body}</p>
                      </div>
                      <ArrowUpRight className="hidden h-5 w-5 self-center text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground md:block" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* SUCCESS STORIES */}
        <section id="stories" className="border-y border-border/60 bg-secondary/40 py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <SectionLabel>Stories</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                Real work, real people, real change.
              </h2>
              <p className="mt-6 max-w-lg text-muted-foreground">
                We don't publish testimonials. We tell the stories of what
                happened after the work was done.
              </p>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {stories.map((s, i) => (
                <article
                  key={s.title}
                  className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                      <span>Case {String(i + 1).padStart(2, "0")}</span>
                      <span className="text-copper">{s.tag}</span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl leading-tight md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                  <div className="mt-10 border-t border-border pt-6">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      Impact
                    </div>
                    <p className="mt-2 font-display text-lg text-foreground">
                      {s.impact}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-grid opacity-20" />
          <div className="absolute -left-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-copper/20 blur-3xl" />
          <div className="absolute -right-40 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-copper/10 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-6 py-40 text-center lg:px-10 lg:py-56">
            <SectionLabel className="text-ivory/60">Manifesto</SectionLabel>
            <p className="mt-12 font-display text-4xl leading-[1.15] text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              Technology is only the tool.
              <br />
              <span className="text-ivory/70">People are always the purpose.</span>
              <br />
              <br />
              Because from ideas,
              <br />
              <em className="italic text-copper">worlds are born.</em>
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <SectionLabel>Contact</SectionLabel>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                  Start a conversation, not a quote.
                </h2>
                <p className="mt-6 text-muted-foreground text-pretty">
                  Tell us what you're trying to build — or what you'd build if
                  the technology stopped being in the way. We'll listen first.
                </p>

                <ul className="mt-12 space-y-4">
                  <ContactRow icon={Phone} label="Phone" value="+351 210 000 000" href="tel:+351210000000" />
                  <ContactRow icon={MessageCircle} label="WhatsApp" value="Message us on WhatsApp" href="https://wa.me/351910000000" />
                  <ContactRow icon={Mail} label="Email" value="hello@ogma.studio" href="mailto:hello@ogma.studio" />
                  <ContactRow icon={Linkedin} label="LinkedIn" value="linkedin.com/company/ogma" href="https://linkedin.com" />
                  <ContactRow icon={Instagram} label="Instagram" value="@ogma.studio" href="https://instagram.com" />
                </ul>
              </div>

              <form
                onSubmit={(e) => e.preventDefault()}
                className="lg:col-span-7 rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)] md:p-12"
              >
                <div className="grid gap-6 md:grid-cols-2">
                  <Field label="Your name" id="name" placeholder="Ana Ribeiro" />
                  <Field label="Company" id="company" placeholder="Where do you work?" />
                  <Field label="Email" id="email" type="email" placeholder="you@company.com" />
                  <Field label="Phone (optional)" id="phone" placeholder="+351 900 000 000" />
                </div>
                <div className="mt-6">
                  <label htmlFor="message" className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                    Tell us about your idea
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="What are you trying to build, and who is it for?"
                    className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
                  />
                </div>
                <button
                  type="submit"
                  className="group mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-medium text-primary-foreground transition-all hover:bg-copper sm:w-auto"
                >
                  Start the conversation
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
                <p className="mt-4 text-xs text-muted-foreground">
                  We reply within one business day, from a real person.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <a href="#top" className="flex items-center gap-2">
              <Logo />
              <span className="font-display text-xl">OGMA</span>
            </a>
            <nav className="flex flex-wrap gap-x-8 gap-y-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-3">
              <SocialIcon href="https://linkedin.com" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="mailto:hello@ogma.studio" label="Email"><Mail className="h-4 w-4" /></SocialIcon>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} OGMA. All rights reserved.</p>
            <p className="font-display text-sm italic text-copper">Das ideias nascem os mundos.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- small components ---------- */

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground ${className}`}>
      <span className="h-px w-8 bg-copper" />
      {children}
    </div>
  );
}

function Field({
  label,
  id,
  placeholder,
  type = "text",
}: {
  label: string;
  id: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-input bg-background px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 focus:border-copper focus:outline-none focus:ring-2 focus:ring-copper/20"
      />
    </div>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
}) {
  return (
    <li>
      <a
        href={href}
        className="group flex items-center gap-4 rounded-xl border border-transparent p-3 -mx-3 transition-colors hover:border-border hover:bg-card"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground">
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex-1">
          <span className="block text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
          <span className="mt-0.5 block text-base text-foreground">{value}</span>
        </span>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-copper" />
      </a>
    </li>
  );
}

function SocialIcon({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      aria-label={label}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
    >
      {children}
    </a>
  );
}

function Logo() {
  return (
    <span
      aria-hidden
      className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/15 text-copper"
    >
      <span className="font-display text-lg leading-none">O</span>
    </span>
  );
}

function AbstractLines() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="glow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.62 0.14 45)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="oklch(0.62 0.14 45)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#glow)" strokeWidth="1">
        <circle cx="900" cy="200" r="180" />
        <circle cx="900" cy="200" r="280" />
        <circle cx="900" cy="200" r="380" />
        <circle cx="900" cy="200" r="500" />
      </g>
      <g fill="none" stroke="oklch(0.955 0.012 85 / 0.08)" strokeWidth="1">
        <path d="M0 700 Q 400 500 800 650 T 1600 600" />
        <path d="M0 750 Q 400 550 800 700 T 1600 650" />
        <path d="M0 800 Q 400 600 800 750 T 1600 700" />
      </g>
    </svg>
  );
}
