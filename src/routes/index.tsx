import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import ogmaLogoWhite from "@/assets/ogma-logo-white.png.asset.json";
import { CosmicBackground } from "@/components/CosmicBackground";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Sparkles,
  Workflow,
  ShieldCheck,
  PenTool,
  Palette,
  Compass,
  Share2,
  CloudCog,
  Mail,
  Linkedin,
  Instagram,
  Terminal,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    links: [{ rel: "canonical", href: "/" }],
    meta: [{ property: "og:url", content: "/" }],
  }),
});

const nav = [
  { label: "Sobre", href: "#who" },
  { label: "Serviços", href: "#services" },
  { label: "Princípios", href: "#principles" },
  { label: "Casos", href: "#stories" },
  { label: "Contato", href: "#contact" },
];

const services = [
  { icon: Code2, title: "Software Engineering", body: "Sistemas construídos para durar anos, não trimestres. Base sólida para crescer com ambição." },
  { icon: Sparkles, title: "Inteligência Artificial", body: "IA que devolve horas ao seu time e responde perguntas que ninguém sabia formular." },
  { icon: Workflow, title: "Automação de Processos", body: "Fluxos silenciosos e confiáveis que tiram o atrito de tudo que sua equipe realmente quer fazer." },
  { icon: ShieldCheck, title: "Cibersegurança", body: "Proteção incorporada ao jeito de trabalhar. Confiança do cliente é algo que se mantém, não que se promete." },
  { icon: PenTool, title: "UI/UX Design", body: "Interfaces que respeitam quem está do outro lado da tela e tornam o complexo em algo natural." },
  { icon: Palette, title: "Identidade de Marca", body: "Uma linguagem visual com a sua voz. Reconhecível em um instante, memorável por muito tempo." },
  { icon: Compass, title: "Estratégia Digital", body: "Direção clara sobre o que construir, em que ordem e por quê. Menos apostas, mais significativas." },
  { icon: Share2, title: "Social Media", body: "Presença com ponto de vista. Histórias que atraem as pessoas certas para o que você está construindo." },
  { icon: CloudCog, title: "Cloud Infrastructure", body: "Infraestrutura que sai da frente — resiliente quando importa, invisível no resto do tempo." },
];

const principles = [
  { n: "01", title: "Conhecimento antes de tecnologia", body: "Entendemos o negócio antes de escolher a ferramenta. A melhor solução é a que responde à pergunta certa." },
  { n: "02", title: "Pessoas antes de processos", body: "Construímos para os humanos que usam o que fazemos — clientes, times, e todos no meio." },
  { n: "03", title: "Segurança antes de escala", body: "Crescer sem segurança é fragilidade. Desenhamos confiança na fundação." },
  { n: "04", title: "Design com propósito", body: "Cada pixel, cada fluxo, cada linha de texto existe por um motivo — ou simplesmente não existe." },
  { n: "05", title: "Parceria de longo prazo", body: "Ficamos por perto depois do lançamento. O produto só começa a importar quando pessoas reais o usam." },
];

const stories = [
  { tag: "Varejo familiar", metric: "-42%", metricLabel: "tempo em tarefas administrativas", title: "Uma loja que finalmente conseguiu se enxergar.", body: "Décadas de papelada viraram clareza diária. A próxima geração assumiu com confiança e o fundador se aposentou nos seus próprios termos." },
  { tag: "Rede de clínicas", metric: "-31%", metricLabel: "tempo de espera do paciente", title: "Cuidado que chega antes do formulário.", body: "Um sistema seguro e discreto cuida da rotina, para que os enfermeiros gastem esses minutos com pacientes, não com telas." },
  { tag: "Indústria independente", metric: "3.2×", metricLabel: "mais rápido para orçar", title: "Uma oficina que conversa consigo mesma.", body: "Chão de fábrica, escritório e cliente conectados em uma única fonte de verdade. Sem ligações para descobrir o que está acontecendo." },
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
    <div className="relative min-h-dvh overflow-hidden bg-background text-foreground">
      {/* NAV */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "backdrop-blur-xl bg-background/70 border-b border-border" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
          <a href="#top" className="flex items-center gap-2.5">
            <Logo />
            <span className="text-[15px] font-medium tracking-tight">
              OGMA <span className="text-muted-foreground">Labs</span>
            </span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-1.5 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            Falar com a Labs
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden pt-40 pb-32 lg:pt-48 lg:pb-40">
          <CosmicBackground />
          <div className="pointer-events-none absolute inset-0 bg-grid" />
          <HeroGlow />

          <div className="relative mx-auto max-w-6xl px-6 text-center lg:px-10">
            <a
              href="#stories"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-3 py-1 text-xs text-muted-foreground backdrop-blur transition-colors hover:text-foreground"
            >
              <span className="flex h-1.5 w-1.5 rounded-full bg-copper shadow-[0_0_8px_var(--copper)]" />
              Novos casos publicados
              <span className="text-foreground">Ver histórias</span>
              <ArrowRight className="h-3 w-3" />
            </a>

            <h1 className="mt-8 font-display text-5xl leading-[0.98] text-balance sm:text-7xl md:text-8xl lg:text-[104px]">
              <span className="text-gradient">Das ideias</span>
              <br />
              <span className="italic text-gradient-copper">nascem os mundos.</span>
            </h1>

            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
              A OGMA Labs transforma ideias em negócios mais inteligentes,
              usando tecnologia para ampliar o potencial das pessoas.
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
              >
                Construir juntos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/40 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-secondary"
              >
                <Terminal className="h-4 w-4 text-muted-foreground" />
                Ver capacidades
              </a>
            </div>

            {/* stat strip */}
            <div className="mx-auto mt-24 grid max-w-4xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
              {[
                ["12+", "anos construindo"],
                ["80+", "parceiros ativos"],
                ["9", "disciplinas"],
                ["24/7", "presença"],
              ].map(([k, v]) => (
                <div key={v} className="bg-background/60 px-6 py-6 backdrop-blur">
                  <div className="font-display text-3xl text-gradient-copper">{k}</div>
                  <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHO */}
        <section id="who" className="relative border-t border-border py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel>Sobre / 01</SectionLabel>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl">
                  Um nome celta.
                  <br />
                  <span className="italic text-gradient-copper">Um propósito moderno.</span>
                </h2>
              </div>
              <div className="lg:col-span-8">
                <div className="grid gap-8 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
                  <p>
                    <span className="text-foreground">Ogma</span> era o guardião
                    celta do conhecimento e da comunicação — aquele que carregava
                    o significado entre as pessoas. Achamos o nome certo para uma
                    empresa que acredita que conhecimento só tem valor quando
                    provoca mudança real na vida de alguém.
                  </p>
                  <p>
                    Somos engenheiros, designers e estrategistas. Removemos o
                    peso tecnológico entre uma ideia e as pessoas que ela deveria
                    servir. Tecnologia nunca é o objetivo. É a ferramenta.
                  </p>
                </div>
                <div className="mt-14 rounded-2xl border border-border bg-secondary/30 p-8 backdrop-blur">
                  <p className="font-display text-2xl leading-snug text-foreground md:text-3xl">
                    "Algumas ideias viram negócios. Outras mudam comunidades.
                    Nosso trabalho é garantir que a tecnologia nunca seja o que
                    as impede."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="relative border-t border-border py-32 lg:py-40">
          <div className="pointer-events-none absolute inset-0 bg-dots opacity-40" />
          <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <SectionLabel>Serviços / 02</SectionLabel>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                  Nove disciplinas.
                  <br />
                  <span className="italic text-gradient-copper">Uma forma de trabalhar.</span>
                </h2>
              </div>
              <p className="max-w-md text-muted-foreground">
                Medimos nosso trabalho pelo que muda para quem usa —
                não pelas ferramentas escolhidas no caminho.
              </p>
            </div>

            <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <div
                  key={s.title}
                  className="group relative flex flex-col justify-between overflow-hidden bg-background/80 p-8 backdrop-blur transition-colors duration-300 hover:bg-secondary"
                >
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-copper/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-secondary/60 text-copper transition-colors group-hover:border-copper/40">
                        <s.icon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl">{s.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                  <div className="mt-10 flex items-center gap-2 text-xs text-muted-foreground transition-colors group-hover:text-copper">
                    <span className="font-mono uppercase tracking-widest">explorar</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section id="principles" className="relative border-t border-border py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="grid gap-16 lg:grid-cols-12">
              <div className="lg:col-span-4">
                <SectionLabel>Princípios / 03</SectionLabel>
                <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl">
                  Cinco regras.
                  <br />
                  <span className="italic text-gradient-copper">Mesmo quando é mais difícil.</span>
                </h2>
                <p className="mt-6 text-muted-foreground">
                  Não são valores no rodapé. São filtros de decisão que aplicamos todo dia.
                </p>
              </div>
              <div className="lg:col-span-8">
                <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-secondary/20 backdrop-blur">
                  {principles.map((p) => (
                    <li
                      key={p.n}
                      className="group grid grid-cols-[auto_1fr_auto] items-start gap-6 p-8 transition-colors hover:bg-secondary/60"
                    >
                      <span className="font-mono text-sm text-copper">{p.n}</span>
                      <div>
                        <h3 className="font-display text-2xl md:text-3xl">{p.title}</h3>
                        <p className="mt-2 max-w-xl text-muted-foreground">{p.body}</p>
                      </div>
                      <ArrowUpRight className="mt-2 h-5 w-5 self-start text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 group-hover:text-copper" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* STORIES */}
        <section id="stories" className="relative border-t border-border py-32 lg:py-40">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="max-w-2xl">
              <SectionLabel>Casos / 04</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                Trabalho real.
                <br />
                <span className="italic text-gradient-copper">Pessoas reais. Mudança real.</span>
              </h2>
              <p className="mt-6 max-w-lg text-muted-foreground">
                Não publicamos depoimentos. Contamos o que aconteceu depois que o trabalho terminou.
              </p>
            </div>

            <div className="mt-16 grid gap-6 lg:grid-cols-3">
              {stories.map((s, i) => (
                <article
                  key={s.title}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-secondary/20 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-copper/30 hover:bg-secondary/40"
                >
                  <div className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-copper/10 opacity-0 blur-3xl transition-opacity group-hover:opacity-100" />
                  <div>
                    <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
                      <span>caso_{String(i + 1).padStart(2, "0")}</span>
                      <span className="text-copper">{s.tag}</span>
                    </div>
                    <div className="mt-8 flex items-baseline gap-3">
                      <span className="font-display text-6xl text-gradient-copper">{s.metric}</span>
                    </div>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.metricLabel}</p>
                    <h3 className="mt-8 font-display text-2xl leading-tight md:text-3xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {s.body}
                    </p>
                  </div>
                  <div className="mt-10 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground transition-colors group-hover:text-copper">
                    ler caso <ArrowRight className="h-3 w-3" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="relative overflow-hidden border-t border-border py-40 lg:py-56">
          <div className="pointer-events-none absolute inset-0 bg-grid opacity-70" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-copper/10 blur-[120px]" />
          <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-10">
            <SectionLabel className="justify-center">Manifesto</SectionLabel>
            <p className="mt-12 font-display text-4xl leading-[1.1] text-balance sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-gradient">A tecnologia é apenas a ferramenta.</span>
              <br />
              <span className="text-gradient">As pessoas são sempre o propósito.</span>
              <br />
              <br />
              <span className="italic text-gradient-copper">Porque das ideias nascem os mundos.</span>
            </p>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="relative border-t border-border py-32 lg:py-40">
          <div className="mx-auto max-w-5xl px-6 lg:px-10">
            <div className="text-center">
              <SectionLabel className="justify-center">Contato / 05</SectionLabel>
              <h2 className="mt-6 font-display text-4xl leading-[1.05] text-balance sm:text-5xl md:text-6xl">
                Vamos construir juntos.
              </h2>
              <p className="mx-auto mt-6 max-w-xl text-muted-foreground text-pretty">
                Conte o que você está tentando construir — ou o que construiria
                se a tecnologia não estivesse no caminho.
              </p>
            </div>

            <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <a
                href="mailto:labs@ogma.dev"
                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-secondary/20 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-copper/30 hover:bg-secondary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors group-hover:border-copper/40 group-hover:text-copper">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="text-center">
                  <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">Email</span>
                  <span className="mt-1 block text-sm text-foreground">labs@ogma.dev</span>
                </div>
                <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-copper" />
              </a>

              <a
                href="https://wa.me/5511900000000"
                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-secondary/20 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-copper/30 hover:bg-secondary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors group-hover:border-copper/40 group-hover:text-copper">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </span>
                <div className="text-center">
                  <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</span>
                  <span className="mt-1 block text-sm text-foreground">Chame agora</span>
                </div>
                <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-copper" />
              </a>

              <a
                href="https://instagram.com"
                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-secondary/20 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-copper/30 hover:bg-secondary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors group-hover:border-copper/40 group-hover:text-copper">
                  <Instagram className="h-5 w-5" />
                </span>
                <div className="text-center">
                  <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">Instagram</span>
                  <span className="mt-1 block text-sm text-foreground">@ogma.labs</span>
                </div>
                <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-copper" />
              </a>

              <a
                href="https://linkedin.com"
                className="group relative flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-secondary/20 p-8 backdrop-blur transition-all hover:-translate-y-1 hover:border-copper/30 hover:bg-secondary/40"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors group-hover:border-copper/40 group-hover:text-copper">
                  <Linkedin className="h-5 w-5" />
                </span>
                <div className="text-center">
                  <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">LinkedIn</span>
                  <span className="mt-1 block text-sm text-foreground">ogma-labs</span>
                </div>
                <ArrowUpRight className="absolute top-4 right-4 h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:text-copper" />
              </a>
            </div>

            <p className="mt-12 text-center font-mono text-xs text-muted-foreground">
              → resposta em até 1 dia útil, por uma pessoa real.
            </p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="relative border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-10 md:grid-cols-[1fr_auto_auto] md:items-center">
            <a href="#top" className="flex items-center gap-2.5">
              <Logo />
              <span className="text-[15px] font-medium">
                OGMA <span className="text-muted-foreground">Labs</span>
              </span>
            </a>
            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {nav.map((n) => (
                <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <SocialIcon href="https://linkedin.com" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="https://instagram.com" label="Instagram"><Instagram className="h-4 w-4" /></SocialIcon>
              <SocialIcon href="mailto:labs@ogma.dev" label="Email"><Mail className="h-4 w-4" /></SocialIcon>
            </div>
          </div>
          <div className="mt-10 flex flex-col gap-3 border-t border-border pt-8 font-mono text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
            <p>© {new Date().getFullYear()} OGMA Labs · Todos os direitos reservados</p>
            <p className="italic font-display text-sm not-italic text-copper">
              Das ideias nascem os mundos.
            </p>
          </div>
        </div>

        {/* wordmark */}
        <div aria-hidden className="pointer-events-none select-none overflow-hidden border-t border-border">
          <div className="mx-auto max-w-[1400px] px-6 pb-8 pt-6 lg:px-10">
            <div className="font-display text-[22vw] leading-none tracking-tighter text-gradient opacity-[0.06]">
              OGMA<span className="italic">Labs</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- components ---------- */

function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground ${className}`}>
      <span className="h-px w-6 bg-copper" />
      {children}
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
        className="group flex items-center gap-4 rounded-xl border border-transparent p-3 -mx-3 transition-colors hover:border-border hover:bg-secondary/40"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary/60 text-foreground transition-colors group-hover:border-copper/40 group-hover:text-copper">
          <Icon className="h-4 w-4" />
        </span>
        <span className="flex-1">
          <span className="block font-mono text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
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
      className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-copper/40 hover:text-copper"
    >
      {children}
    </a>
  );
}

/** Logo: the official OGMA Labs mark (uploaded brand asset). */
function Logo() {
  return (
    <span aria-hidden className="relative flex h-8 w-8 items-center justify-center">
      <img
        src={ogmaLogoWhite.url}
        alt=""
        width={32}
        height={32}
        className="relative h-8 w-8 object-contain"
      />
    </span>
  );
}

function HeroGlow() {
  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-copper/15 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-copper/40 to-transparent" />
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 mx-auto h-full w-full max-w-6xl opacity-60"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="oklch(0.72 0.16 55)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="oklch(0.72 0.16 55)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="url(#ring)" strokeWidth="1">
          <circle cx="600" cy="400" r="180" />
          <circle cx="600" cy="400" r="300" />
          <circle cx="600" cy="400" r="440" />
          <circle cx="600" cy="400" r="600" />
        </g>
      </svg>
    </>
  );
}
